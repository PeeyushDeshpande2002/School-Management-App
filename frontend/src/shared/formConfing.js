export const formConfig = {
  class: [
    { name: "className", label: "Class Name", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "teacher", label: "Teacher", type: "text" },
  ],
  teacher: [
    { name: "name", label: "Name", type: "text" },
    { name: "gender", label: "Gender", type: "text" },
    { name: "dob", label: "Date of Birth", type: "date" },
    // Add more fields as needed
  ],
  student: [
    { name: "name", label: "Name", type: "text" },
    { name: "gender", label: "Gender", type: "text" },
    { name: "dob", label: "Date of Birth", type: "date" },
    // Add more fields as needed
  ],
  login: [
    {
      email: "email",
      label: "Enter your Email",
      type: "text",
    },
    {
      password: "password",
      label: "Enter your Password",
      type: "text",
    },
  ],
};
