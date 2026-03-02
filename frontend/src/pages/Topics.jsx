import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import '../styles/subjects.css';

export default function Topics() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <div className="page-container">
          <header className="page-header">
            <div>
              <h1 className="page-title"><span className="title-gradient">Study Topics</span></h1>
              <p className="page-subtitle">Browse and manage your study topics</p>
            </div>
          </header>
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-secondary)' }}>
            <h3>Topics page coming soon...</h3>
          </div>
        </div>
      </main>
    </div>
  );
}
