import React, { useState, useCallback } from "react";

const addSkill = async (data) => {
  await fetch(`${process.env.REACT_APP_BASE_URL}/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
};

export default function AddSkillForm({ refetch }) {
  const [name, setName] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    addSkill({ name }).then(refetch);
    setName('');
  }, [name, refetch]);

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Create a new Skill:
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        <button>Add Skill</button>
      </form>
    </div>
  );
}
