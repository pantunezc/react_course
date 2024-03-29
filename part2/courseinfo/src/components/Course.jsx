const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
);

const Course = ({ course }) => {
  const parts = course.parts;

  return (
    <div>
      <Header course={course.name} />
      <Content parts={parts} />
      <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  );
};

export default Course;
