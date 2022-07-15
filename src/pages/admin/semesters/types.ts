interface SemesterForm {
  name: string;
  startDate: string;
  endDate: string;
  gigRequirement: number | null;
}

const emptySemesterForm: SemesterForm = {
  name: "",
  startDate: "",
  endDate: "",
  gigRequirement: null
};

const formFromSemester = (semester: Semester): SemesterForm => ({
  name: semester.name,
  startDate: hyphenDateFormatter(semester.startDate),
  endDate: hyphenDateFormatter(semester.endDate),
  gigRequirement: semester.gigRequirement

});

const semesterJson = (form: SemesterForm) => ({
  name: form.name,
  startDate: parseFormDateString(form.startDate) || new Date().getTime(),
  endDate: parseFormDateString(form.endDate) || new Date().getTime(),
  gigRequirement: form.gigRequirement || 5
});
