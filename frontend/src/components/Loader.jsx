import '../styles/loader.css';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-core">
          <div className="loader-icon">🎓</div>
        </div>
      </div>
      <p className="loader-text">Loading your study data...</p>
    </div>
  );
}
