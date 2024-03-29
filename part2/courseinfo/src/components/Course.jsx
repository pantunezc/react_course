const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => (
  <p>
    <b>Total of {sum} exercises</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const parts = course.parts;

  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={parts} />
      <Total sum={total} />
    </div>
  );
};

export default Course;
