import { useCallback, useEffect, useState } from "react";
import SkillList from "./SkillList";
import AddSkill from "./AddSkill";
import AttachSkill from "./AttachSkill";
import "./Skills.css";

const fetchSkills = async () => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/skills`);
  const { items } = await response.json();
  return items;
};

const fetchUsersBySkill = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/skills/${id}/users`);
  const { items } = await response.json();
  return items;
};

const SkillsActions = ({ children }) => (
  <div className="skills-actions">{children}</div>
);

export default function Skills({ userList, fetchUsers, onFilter }) {
  const [skills, setSkills] = useState([]);
  const loadSkills = useCallback(() => {
    fetchSkills().then(setSkills);
  }, []);

  const filterUsers = useCallback((id) => {
    fetchUsersBySkill(id).then(onFilter);
  }, [onFilter]);
  useEffect(loadSkills, [loadSkills]);
  return (
    <>
      <SkillList skills={skills} onItemClick={filterUsers} />
      <SkillsActions>
        <AddSkill refetch={loadSkills} />
        <AttachSkill userList={userList} skills={skills} refetch={filterUsers} />
      </SkillsActions>
    </>
  );
}

