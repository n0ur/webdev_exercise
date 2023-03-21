const SkillItem = ({ id, name, onClick }) => {
  return (
    <div className="skills-list__item" onClick={() => onClick(id)}>
      <span>{name}</span>
    </div>
  )
};

export default function SkillList({ skills, onItemClick }) {
  return (
    <div className="skills-list">
      {skills.map((skill) => (
        <SkillItem key={skill.id} onClick={onItemClick} {...skill} />
      ))}
    </div>
  );
}

