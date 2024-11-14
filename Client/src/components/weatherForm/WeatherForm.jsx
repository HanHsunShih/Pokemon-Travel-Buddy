export default function WeatherForm({ handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label name="city">City Name:</label>
        <input name="city" type="text" />
      </form>
    </>
  );
}
