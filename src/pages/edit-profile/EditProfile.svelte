<script lang="ts">
  import { emptyLoaded, loading, RemoteData } from "state/types";
  import { siteContext } from "store/context";
  import { get } from "svelte/store";

  let state: RemoteData = emptyLoaded;

  async function updateProfile() {
    state = loading;

    const enteredPassword = !!(password || confirmPassword);
    if (!enteredPassword && !get(siteContext).user) {
      alert("You must enter a password.");
      return;
    } else if (password !== confirmPassword) {
      alert("Your passwords don't match.");
      return;
    } else if (!section) {
      alert("You need a section, bucko.");
      return;
    }

    const passHash = enteredPassword
      ? (Md5.hashStr(password) as string)
      : null;
    const result = await post(user ? "members/profile" : "members", body);

    setState(resultToSubmissionState(result));
    if (result.successful) {
      if (user) {
        goToRoute(routeProfile(user.email, null));
      } else {
        goToRoute(routeLogin);
        alert(`You have successfully created an account with email ${body.email}!`);
      }
    }
  }, [setState, form, user, goToRoute]);
</script>

<Section>
  <Container>
    <Title>{$siteContext.user ? "Edit" : "Create"} Profile</Title>
    <Box>
      <HeaderText />
      <br />
      <FormFields
        form={form}
        update={updateForm}
        user={user}
        submit={submit}
        state={state}
      />

    <form onSubmit={submit}>
      <Title4>Really Important Stuff</Title4>
      <InputWrapper horizontal title="Name">
        <TextInput
          type={stringType}
          value={form.firstName}
          onInput={firstName => update({ ...form, firstName })}
          required
          placeholder="First"
        />
        <TextInput
          type={stringType}
          value={form.preferredName}
          onInput={preferredName => update({ ...form, preferredName })}
          placeholder="Preferred (optional)"
        />
        <TextInput
          type={stringType}
          value={form.lastName}
          onInput={lastName => update({ ...form, lastName })}
          required
          placeholder="Last"
        />
      </InputWrapper>
      <TextInput
        type={emailType}
        value={form.email}
        onInput={email => update({ ...form, email })}
        horizontal
        required
        title="E-mail"
        placeholder="gburdell3@gatech.edu"
      />
      <TextInput
        type={phoneType}
        value={form.phoneNumber}
        onInput={phoneNumber => update({ ...form, phoneNumber })}
        horizontal
        required
        title="Phone Number"
        placeholder="6788675309"
      />
      <InputWrapper horizontal title="Password">
        <TextInput
          type={passwordType}
          value={form.password}
          onInput={password => update({ ...form, password })}
          required
          placeholder="Password"
        />
        <TextInput
          type={passwordType}
          value={form.confirmPassword}
          onInput={confirmPassword => update({ ...form, confirmPassword })}
          required
          placeholder="Confirm Password"
        />
      </InputWrapper>
      <InputWrapper horizontal title="Location">
        <TextInput
          type={stringType}
          value={form.location}
          onInput={location => update({ ...form, location })}
          placeholder="Glenn"
        />
        <Control>
          <ButtonGroup connected>
            <Button
              color={form.onCampus ? "is-primary" : undefined}
              onClick={() => update({ ...form, onCampus: true })}
            >
              On-campus
            </Button>
            <Button
              color={!form.onCampus ? "is-primary" : undefined}
              onClick={() => update({ ...form, onCampus: false })}
            >
              Off-campus
            </Button>
          </ButtonGroup>
        </Control>
      </InputWrapper>
      <TextInput
        type={stringType}
        value={form.major}
        onInput={major => update({ ...form, major })}
        required
        horizontal
        title="Major"
        placeholder="Undecided Engineering"
      />
      <TextInput
        type={stringType}
        value={form.hometown}
        onInput={hometown => update({ ...form, hometown })}
        required
        horizontal
        title="Hometown"
        placeholder="Winslow, Arizona"
      />
      <InputWrapper horizontal title="Car">
        <TextInput
          type={stringType}
          value={form.location}
          onInput={location => update({ ...form, location })}
          placeholder="Glenn"
        />
        <Control>
          <ButtonGroup connected>
            <Button
              color={form.onCampus ? "is-primary" : undefined}
              onClick={() => update({ ...form, onCampus: true })}
            >
              On-campus
            </Button>
            <Button
              color={!form.onCampus ? "is-primary" : undefined}
              onClick={() => update({ ...form, onCampus: false })}
            >
              Off-campus
            </Button>
          </ButtonGroup>
        </Control>
      </InputWrapper>
      <InputWrapper horizontal title="Enrollment">
        <InputWrapper horizontal>
          <Control>
            <ButtonGroup connected>
              {user && (
                <EnrollmentOption form={form} update={update} enrollment={null} />
    <Button
      color={form.enrollment === enrollment ? "is-primary" : undefined}
      onClick={() => update({ ...form, enrollment })}
    >
      {enrollment || "Inactive"}
    </Button>
              )}
    <Button
      color={form.enrollment === enrollment ? "is-primary" : undefined}
      onClick={() => update({ ...form, enrollment })}
    >
      {enrollment || "Inactive"}
    </Button>
              <EnrollmentOption form={form} update={update} enrollment={"Class"} />
              <EnrollmentOption form={form} update={update} enrollment={"Club"} />

    <Button
      color={form.enrollment === enrollment ? "is-primary" : undefined}
      onClick={() => update({ ...form, enrollment })}
    >
      {enrollment || "Inactive"}
    </Button>
            </ButtonGroup>
          </Control>
          <span style={{ width: "15px" }} />
          <SelectInput
            type={sectionType(info)}
            values={info?.sections || []}
            selected={form.section}
            onInput={section => update({ ...form, section })}
          />
        </InputWrapper>
      </InputWrapper>

      <Title4>Nice to Know</Title4>
      <TextInput
        type={stringType}
        value={form.about}
        onInput={about => update({ ...form, about })}
        horizontal
        title="About"
        placeholder="I like big butts and I cannot lie"
      />
      <TextInput
        type={stringType}
        value={form.picture}
        onInput={picture => update({ ...form, picture })}
        horizontal
        title="Picture URL"
        placeholder="https://create.mylittlepony.movie/images/ponyparticon_bodybig.png"
      />
      <TextInput
        type={numberType}
        value={form.arrivedAtTech}
        onInput={arrivedAtTech =>
          update({
            ...form,
            arrivedAtTech: arrivedAtTech || new Date().getFullYear()
          })
        }
        horizontal
        title="Arrived at Tech"
        placeholder="2099"
      />
      <ButtonGroup alignment="is-right">
        {user && (
          <LinkButton route={routeProfile(user.email, null)}>Back</LinkButton>
        )}
        <SubmitButton color="is-primary" loading={isSending(state)}>
          Save
        </SubmitButton>
      </ButtonGroup>
    </form>
      {failedToSend(state) && <ErrorBox error={state.error} />}
    </Box>
  </Container>
</Section>
