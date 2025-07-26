import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem("studentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("studentToken") || ""
  );
  const [studentId, setStudentId] = useState(
    () => localStorage.getItem("studentId") || ""
  );
  const [studentGender, setStudentGender] = useState(
    () => localStorage.getItem("studentGender") || ""
  );
  const [userCampus, setUserCampus] = useState(
    () => localStorage.getItem("userCampus") || ""
  );

  const [assignedRoomId, setAssignedRoomId] = useState(() => {
    const savedStudent = localStorage.getItem("studentUser");
    return savedStudent
      ? JSON.parse(savedStudent).assigned_room_id || null
      : null;
  });

    const [hostelChoices, setHostelChoices] = useState(() => {
    const saved = localStorage.getItem("hostelChoiceId");
    return saved ? JSON.parse(saved) : [];
  });


  const login = (data) => {
    console.log(data);
    const { token, student } = data;
    setToken(token);
    setStudent(student);
    setStudentId(student.id || "");
    setStudentGender(student.gender || "");
    setUserCampus(student.campus || "");
    setAssignedRoomId(student.assigned_room_id || null);

    const choiceArray = [
      student.choice1_hostel_id,
      student.choice2_hostel_id,
      student.choice3_hostel_id,
    ];

    setHostelChoices(choiceArray);

    localStorage.setItem("studentToken", token);
    localStorage.setItem("studentUser", JSON.stringify(student));
    localStorage.setItem("studentId", student.id || "");
    localStorage.setItem("studentGender", student.gender || "");
    localStorage.setItem("userCampus", student.campus || "");
  };

  const logout = () => {
    setToken("");
    setStudent(null);
    setStudentId("");
    setStudentGender("");
    setUserCampus("");
     setAssignedRoomId(null);
    setHostelChoices([]);

    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentGender");
    localStorage.removeItem("userCampus");
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        token,
        studentId,
        studentGender,
        userCampus,
        assignedRoomId,
        hostelChoices,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
