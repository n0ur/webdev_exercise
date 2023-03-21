import { useCallback, useEffect, useState } from "react";

const attachSkill = async ({ skillId, userId }) => {
  await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}/skills/${skillId}`, {
    method: "POST",
  });
};

export default function AttachSkill({ userList, skills, refetch }) {
  const [selectedUser, setSelectedUser] = useState();
  const [selectedSkill, setSelectedSkill] = useState();

  const handleClick = useCallback(() => {
    attachSkill({ skillId: selectedSkill, userId: selectedUser })
      .then(() => refetch(selectedSkill));
  }, [selectedSkill, selectedUser, refetch]);

  useEffect(() => {
    if (skills.length > 0) {
      setSelectedSkill(skills[0].id);
    }
  }, [skills])

  useEffect(() => {
    if (userList.length > 0) {
      setSelectedUser(userList[0].id);
    }
  }, [userList])

  return (
    <div>
      <span>Select a user: </span>
      <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
        {userList.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <span> and a skill: </span>
      <select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)}>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.id}>{skill.name}</option>
        ))}
      </select>
      <button onClick={handleClick}>Attach</button>
    </div>
  )
};

