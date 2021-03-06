module Components.Basics exposing
    ( attendanceIcon
    , box
    , centeredTitle
    , checkOrCross
    , column
    , columns
    , container
    , divider
    , emailLink
    , errorBox
    , form
    , modal
    , multilineTooltip
    , narrowColumn
    , notFoundView
    , phoneLink
    , remoteContent
    , remoteContentFull
    , renderIfHasPermission
    , section
    , sidebar
    , spinner
    , submissionStateBox
    , subtitle
    , title
    , title4
    , tooltip
    , tooltipRight
    )

import Error exposing (GreaseError(..))
import Html exposing (Html, a, article, div, h1, h3, h4, i, p, span, text)
import Html.Attributes exposing (attribute, class, hidden, href, id, style)
import Html.Events exposing (onClick, onSubmit)
import Maybe.Extra as Maybe
import Models.Event exposing (Event)
import Utils exposing (Common, RemoteData(..), SubmissionState(..), eventIsOver, formatPhone, permittedTo, submissionStateBoxId)


spinner : Html a
spinner =
    div [ class "spinner" ]
        [ div [ class "spinner-inner" ]
            [ i [ class "oldgold-text fas fa-circle-notch fa-2x fa-spin" ] []
            ]
        ]


notFoundView : Html a
notFoundView =
    div []
        [ text "Not found"
        ]


title : String -> Html msg
title content =
    h1 [ class "title" ] [ text content ]


centeredTitle : String -> Html msg
centeredTitle content =
    h1 [ class "title", style "text-align" "center" ] [ text content ]


title4 : String -> Html msg
title4 content =
    h4 [ class "title is-4" ] [ text content ]


subtitle : String -> Html msg
subtitle content =
    h3 [ class "subtitle is-3", style "text-align" "center" ] [ text content ]


column : List (Html msg) -> Html msg
column content =
    div [ class "column" ] content


columns : List (Html msg) -> Html msg
columns content =
    div [ class "columns" ] content


narrowColumn : List (Html msg) -> Html msg
narrowColumn content =
    div [ class "column is-narrow" ] content


box : List (Html msg) -> Html msg
box content =
    div [ class "box" ] content


section : List (Html msg) -> Html msg
section =
    Html.section [ class "section" ]


container : List (Html msg) -> Html msg
container =
    div [ class "container" ]


form : msg -> List (Html msg) -> Html msg
form submit =
    Html.form [ onSubmit submit ]


tooltip : String -> List (Html.Attribute msg)
tooltip content =
    [ class "tooltip is-tooltip"
    , style "cursor" "pointer"
    , attribute "data-tooltip" content
    ]


tooltipRight : String -> List (Html.Attribute msg)
tooltipRight content =
    class "is-tooltip-right" :: tooltip content


multilineTooltip : String -> List (Html.Attribute msg)
multilineTooltip content =
    class "is-tooltip-multiline" :: tooltip content


checkOrCross : Bool -> Html msg
checkOrCross isCheck =
    span [ class "icon is-medium" ]
        [ i
            [ class <|
                "fas fa-lg "
                    ++ (if isCheck then
                            "fa-check"

                        else
                            "fa-times"
                       )
            ]
            []
        ]


divider : String -> Html msg
divider content =
    if String.isEmpty content then
        div [ class "is-divider" ] []

    else
        div
            [ class "is-divider"
            , attribute "data-content" content
            ]
            []


attendanceIcon : Common -> Event -> Html msg
attendanceIcon common event =
    case
        event.attendance
            |> Maybe.filter (\_ -> not (event |> eventIsOver common))
    of
        Nothing ->
            text ""

        Just attendance ->
            let
                tooltipText =
                    (if attendance.confirmed then
                        "confirmed"

                     else
                        "unconfirmed"
                    )
                        ++ ", "
                        ++ (if attendance.shouldAttend then
                                "attending"

                            else
                                "not attending"
                           )

                ( color, success ) =
                    if attendance.confirmed then
                        ( "has-text-success", attendance.shouldAttend )

                    else
                        ( "has-text-grey", attendance.shouldAttend )
            in
            div
                (class color :: class "is-tooltip-right" :: tooltip tooltipText)
                [ checkOrCross success ]


remoteContentFull : Html msg -> (a -> Html msg) -> RemoteData a -> Html msg
remoteContentFull notAskedContent render remoteData =
    case remoteData of
        NotAsked ->
            notAskedContent

        Loading ->
            spinner

        Loaded data ->
            render data

        Failure err ->
            errorBox err


remoteContent : (a -> Html msg) -> RemoteData a -> Html msg
remoteContent =
    remoteContentFull (text "")


renderIfHasPermission : Common -> String -> Html msg -> Html msg
renderIfHasPermission common permission content =
    if common.user |> Maybe.map (permittedTo permission) |> Maybe.withDefault False then
        content

    else
        text ""


type alias Sidebar a msg =
    { render : a -> Html msg
    , data : RemoteData a
    , close : msg
    }


sidebar : Sidebar a msg -> Html msg
sidebar data =
    let
        emptySidebar =
            div [ class "sidenav", hidden True ] []

        overlay =
            div [ class "transparent-overlay", onClick data.close ] []

        sidebarDiv =
            div
                [ class "sidenav"
                , style "padding" "20px"
                , style "padding-top" "80px"
                ]
    in
    div [] <|
        case data.data of
            NotAsked ->
                [ emptySidebar ]

            Loading ->
                [ overlay, sidebarDiv [ spinner ] ]

            Loaded loaded ->
                [ overlay, sidebarDiv [ data.render loaded ] ]

            Failure err ->
                [ overlay, sidebarDiv [ errorBox err ] ]


errorBox : GreaseError -> Html msg
errorBox error =
    let
        ( errorTitle, content ) =
            case error of
                Unauthorized ->
                    ( "unauthorized", "You aren't allowed to be here! Go on, get!" )

                NotActiveYet _ ->
                    ( "not active yet", "You're gonna need to confirm your account for the semester to do stuff." )

                AlreadyLoggedIn _ ->
                    ( "already logged in", "You tried to login twice, dummy. No need to work so hard." )

                Forbidden requiredPermission ->
                    ( requiredPermission
                        |> Maybe.map (\p -> "unable to " ++ p)
                        |> Maybe.withDefault "forbidden"
                    , "Well, well, well, looks like you tried to do something you weren't allowed to. Go to your room!"
                    )

                NotFound ->
                    ( "resource not found", "I've looked everywhere, but I can't find what you're looking for..." )

                BadRequest reason ->
                    ( "bad request", "I've got some bad news for ya: " ++ reason )

                ServerError err ->
                    ( "server error", "Oh lordy, something terrible has come to pass: " ++ err )

                DatabaseError err ->
                    ( "database error", "Don't shoot the messenger, but this came in from headquarters: " ++ err )

                FromRowError err ->
                    ( "from row error", "Blame my friend the database, for they have broken something: " ++ err )

                UnknownError ( status, err ) ->
                    ( "unknown error"
                        ++ (status
                                |> Maybe.map (\s -> " (status " ++ String.fromInt s ++ ")")
                                |> Maybe.withDefault ""
                           )
                    , "I don't even know what happened: " ++ err
                    )
    in
    article
        [ class "message is-danger"
        , style "padding-top" "5px"
        , style "padding-bottom" "5px"
        ]
        [ div [ class "message-header" ]
            [ p []
                [ text "Something went wrong. ("
                , i [] [ text errorTitle ]
                , text ")"
                ]
            ]
        , div [ class "message-body" ] [ text content ]
        ]


submissionStateBox : SubmissionState -> Html msg
submissionStateBox state =
    div [ id submissionStateBoxId ]
        [ case state of
            NotSentYet ->
                text ""

            Sending ->
                spinner

            ErrorSending error ->
                errorBox error
        ]


modal : msg -> Html msg -> Html msg
modal closeMsg content =
    div [ class "modal is-active" ]
        [ div [ class "modal-background", onClick closeMsg ] []
        , div [ class "modal-content", style "text-align" "center" ]
            [ box [ content ] ]
        ]


emailLink : String -> Html msg
emailLink email =
    a [ href <| "mailto:" ++ email ] [ text email ]


phoneLink : String -> Html msg
phoneLink phoneNumber =
    a [ href <| "tel:" ++ phoneNumber ] [ text <| formatPhone phoneNumber ]
