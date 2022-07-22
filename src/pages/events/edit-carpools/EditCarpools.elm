type Msg
    | ClickUnassignedMember Member
    | ClickEmptyUnassignedMemberList
    | ClickDriver UpdatedCarpool
    | ClickPassenger UpdatedCarpool Member
    | ClickEmptyPassengerList UpdatedCarpool
    | AddNewCarpool
    | SaveCarpools
    | OnSaveCarpools (GreaseResult ())

ClickUnassignedMember member ->
    case model.selection of
        Driver carpool ->
            ( unassignCarpoolDriver model carpool, Cmd.none )

        Passengers carpool passengers ->
            ( unassignCarpoolPassengers model carpool passengers, Cmd.none )

        UnassignedMembers members ->
            if members |> List.any (\m -> m.email == member.email) then
                ( { model | selection = UnassignedMembers (members |> List.filter (\m -> m.email /= member.email)) }, Cmd.none )

            else
                ( { model | selection = UnassignedMembers (members ++ [ member ]) }, Cmd.none )

ClickEmptyUnassignedMemberList ->
    case model.selection of
        Driver carpool ->
            ( unassignCarpoolDriver model carpool, Cmd.none )

        Passengers carpool passengers ->
            ( unassignCarpoolPassengers model carpool passengers, Cmd.none )

        UnassignedMembers _ ->
            ( model, Cmd.none )

ClickDriver carpool ->
    case model.selection of
        Driver otherCarpool ->
            let
                carpoolMapper c =
                    if c.driver.email == carpool.driver.email then
                        { c | driver = otherCarpool.driver }

                    else if c.driver.email == otherCarpool.driver.email then
                        { c | driver = carpool.driver }

                    else
                        c
            in
            ( updateCarpoolsAndClearSelection model (List.map carpoolMapper), Cmd.none )

        Passengers otherCarpool passengers ->
            if otherCarpool.driver.email == carpool.driver.email then
                ( model, Cmd.none )

            else
                case passengers |> uncons of
                    Just ( firstPassenger, [] ) ->
                        let
                            carpoolMapper c =
                                if c.driver.email == carpool.driver.email then
                                    { c
                                        | driver = firstPassenger
                                        , passengers =
                                            c.passengers
                                                |> List.filter (\p -> p.email /= firstPassenger.email)
                                    }

                                else
                                    c
                        in
                        ( updateCarpoolsAndClearSelection model (List.map carpoolMapper), Cmd.none )

                    _ ->
                        ( model, Cmd.none )

        UnassignedMembers members ->
            if List.isEmpty members then
                ( { model | selection = Driver carpool }, Cmd.none )

            else
                case members |> uncons of
                    Just ( firstMember, [] ) ->
                        let
                            carpoolMapper c =
                                if c.driver.email == carpool.driver.email then
                                    { c | driver = firstMember }

                                else
                                    c
                        in
                        ( updateCarpoolsAndClearSelection model (List.map carpoolMapper), Cmd.none )

                    _ ->
                        ( model, Cmd.none )

ClickPassenger carpool passenger ->
    case model.selection of
        Driver otherCarpool ->
            if List.isEmpty otherCarpool.passengers then
                ( updateCarpoolsAndClearSelection model
                    (List.concatMap
                        (\c ->
                            if c.driver.email == otherCarpool.driver.email then
                                []

                            else if c.driver.email == carpool.driver.email then
                                [ { c | passengers = c.passengers ++ [ otherCarpool.driver ] } ]

                            else
                                [ c ]
                        )
                    )
                , Cmd.none
                )

            else
                ( model, Cmd.none )

        Passengers otherCarpool passengers ->
            if otherCarpool.driver.email == carpool.driver.email then
                if passengers |> List.any (\p -> p.email == passenger.email) then
                    ( { model | selection = Passengers otherCarpool (passengers |> List.filter (\p -> p.email /= passenger.email)) }, Cmd.none )

                else
                    ( { model | selection = Passengers otherCarpool (passengers ++ [ passenger ]) }, Cmd.none )

            else
                ( updateCarpoolsAndClearSelection model
                    (List.map
                        (\c ->
                            if c.driver.email == carpool.driver.email then
                                { c | passengers = c.passengers ++ passengers }

                            else if c.driver.email == otherCarpool.driver.email then
                                { c | passengers = c.passengers |> List.filter (\p -> passengers |> List.all (\cp -> cp.email /= p.email)) }

                            else
                                c
                        )
                    )
                , Cmd.none
                )

        UnassignedMembers members ->
            if List.isEmpty members then
                ( { model | selection = Passengers carpool [ passenger ] }, Cmd.none )

            else
                ( updateCarpoolsAndClearSelection model
                    (List.map
                        (\c ->
                            if c.driver.email == carpool.driver.email then
                                { c | passengers = c.passengers ++ members }

                            else
                                c
                        )
                    )
                , Cmd.none
                )

ClickEmptyPassengerList carpool ->
    case model.selection of
        Driver otherCarpool ->
            if List.isEmpty otherCarpool.passengers then
                ( updateCarpoolsAndClearSelection model
                    (List.concatMap
                        (\c ->
                            if c.driver.email == otherCarpool.driver.email then
                                []

                            else if c.driver.email == carpool.driver.email then
                                [ { c | passengers = c.passengers ++ [ otherCarpool.driver ] } ]

                            else
                                [ c ]
                        )
                    )
                , Cmd.none
                )

            else
                ( model, Cmd.none )

        Passengers otherCarpool passengers ->
            ( updateCarpoolsAndClearSelection model
                (List.map
                    (\c ->
                        if c.driver.email == carpool.driver.email then
                            { c | passengers = c.passengers ++ passengers }

                        else if c.driver.email == otherCarpool.driver.email then
                            { c | passengers = c.passengers |> List.filter (\p -> passengers |> List.all (\cp -> cp.email /= p.email)) }

                        else
                            c
                    )
                )
            , Cmd.none
            )

        UnassignedMembers members ->
            ( updateCarpoolsAndClearSelection model
                (List.map
                    (\c ->
                        if c.driver.email == carpool.driver.email then
                            { c | passengers = c.passengers ++ members }

                        else
                            c
                    )
                )
            , Cmd.none
            )

AddNewCarpool ->
    ( addNewCarpool model, Cmd.none )

unassignCarpoolPassengers : Model -> UpdatedCarpool -> List Member -> Model
unassignCarpoolPassengers model carpool passengers =
    let
        mapCarpool givenCarpool =
            if givenCarpool.driver.email == carpool.driver.email then
                { givenCarpool | passengers = givenCarpool.passengers |> filterPassengers }

            else
                givenCarpool

        filterPassengers =
            List.filter (\p -> passengers |> List.all (\cp -> cp.email /= p.email))
    in
    updateCarpoolsAndClearSelection model (List.map mapCarpool)

unassignCarpoolDriver : Model -> UpdatedCarpool -> Model
unassignCarpoolDriver model carpool =
    if List.isEmpty carpool.passengers then
        let
            mapCarpools =
                List.filter (\c -> c.driver.email /= carpool.driver.email)
        in
        updateCarpoolsAndClearSelection model mapCarpools

    else
        model

updateCarpoolsAndClearSelection : Model -> (List UpdatedCarpool -> List UpdatedCarpool) -> Model
updateCarpoolsAndClearSelection model carpoolsMapper =
    let
        mapData =
            mapLoaded
                (\data ->
                    { data
                        | carpools = data.carpools |> carpoolsMapper
                    }
                )
    in
    { model
        | selection = UnassignedMembers []
        , data = model.data |> mapData
    }

addNewCarpool : Model -> Model
addNewCarpool model =
    case model.selection of
        UnassignedMembers members ->
            case members |> uncons of
                Just ( firstMember, [] ) ->
                    updateCarpoolsAndClearSelection model
                        (\carpools ->
                            carpools
                                ++ [ { id = Nothing
                                     , driver = firstMember
                                     , passengers = []
                                     }
                                   ]
                        )

                _ ->
                    model

        Passengers carpool passengers ->
            case passengers |> uncons of
                Just ( firstPassenger, [] ) ->
                    updateCarpoolsAndClearSelection model
                        (\carpools ->
                            (carpools
                                |> List.map
                                    (\c ->
                                        if c.driver.email == carpool.driver.email then
                                            { c | passengers = c.passengers |> List.filter (\p -> p.email /= firstPassenger.email) }

                                        else
                                            c
                                    )
                            )
                                ++ [ { id = Nothing
                                     , driver = firstPassenger
                                     , passengers = []
                                     }
                                   ]
                        )

                _ ->
                    model

        Driver carpool ->
            model

collectSelectedMembers : List Member -> List String -> List Member
collectSelectedMembers members emails =
    emails
        |> List.map (\email -> members |> List.Extra.find (\member -> email == member.email))
        |> List.concatMap (\maybeMember -> maybeMember |> Maybe.map List.singleton |> Maybe.withDefault [])

allMembersAreNotInCarpools : CarpoolData -> List String -> Bool
allMembersAreNotInCarpools data selection =
    not
        (selection
            |> List.any
                (\email -> data.carpools |> List.any (memberInCarpool email))
        )

memberInCarpool : String -> UpdatedCarpool -> Bool
memberInCarpool email carpool =
    (carpool.driver.email == email)
        || (carpool.passengers |> List.any (\passenger -> passenger.email == email))

remainingMembers : List UpdatedCarpool -> List Member -> List Member
remainingMembers carpools members =
    let
        carpoolEmails =
            carpools
                |> List.concatMap
                    (\carpool ->
                        carpool.driver.email :: (carpool.passengers |> List.map .email)
                    )
    in
    members |> List.filter (\member -> carpoolEmails |> List.all ((/=) member.email))

findAttendance : CarpoolData -> String -> Maybe SimpleAttendance
findAttendance data email =
    data.attendance |> find (\attendance -> attendance.member.email == email) |> Maybe.map .attendance
