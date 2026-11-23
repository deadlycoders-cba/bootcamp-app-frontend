// app/components/ProfileCard.tsx

import './ProfileCard.css';

interface ProfileCardProps {
  name: string;
  stream: string;
  bio: string;
  skills: string[];
  githubUrl: string;
}

export default function ProfileCard({
  name, stream, bio, skills, githubUrl
}: ProfileCardProps) {
  return (
    <article className="card">  {/* same semantic element as yesterday */}
      <h1>{name}</h1>           {/* JSX expression: {} */}
      <h2><b>Stream:</b> {stream}</h2>
      <p><b>Bio:</b> {bio}</p>
      <p><b>Skills:</b></p>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <a href={githubUrl}>View GitHub</a>
    </article>
  );
}

