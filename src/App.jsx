const stats = [
  { value: '99.97%', label: 'Threat detection accuracy' },
  { value: '< 2 min', label: 'Average response time' },
  { value: '3.4M', label: 'Events analyzed / day' },
  { value: '24/7', label: 'AI monitoring coverage' },
];

const features = [
  {
    icon: '◈',
    title: 'Behavioral AI Analytics',
    description:
      'Detects subtle anomalies and impersonation patterns across endpoints, identities, and cloud workloads in real time.',
  },
  {
    icon: '◎',
    title: 'Predictive Threat Intelligence',
    description:
      'Correlates indicators of compromise with live external intelligence to prioritize risks before impact spreads.',
  },
  {
    icon: '✦',
    title: 'Autonomous Containment',
    description:
      'Isolates compromised hosts, blocks malicious traffic, and triggers forensic playbooks without slowing operations.',
  },
];

const signals = [
  'Phishing attempts',
  'Credential abuse',
  'Lateral movement',
  'Ransomware staging',
  'Cloud misconfigurations',
  'Insider anomalies',
];

const timeline = [
  { phase: '01', title: 'Collect', text: 'Ingest telemetry from endpoint, identity, email, network, and cloud sources.' },
  { phase: '02', title: 'Analyze', text: 'Run ML models and graph analytics to connect suspicious actions and threat intent.' },
  { phase: '03', title: 'Respond', text: 'Classify severity, trigger automated actions, and alert security teams with context.' },
];

const cards = [
  { value: '14.8x', label: 'Faster investigation time' },
  { value: '92%', label: 'Reduction in false positives' },
  { value: '66%', label: 'Lower analyst workload' },
];

export default function App() {
  return (
    <div className="page-shell">
      <header className="topbar container">
        <div className="brand-wrap">
          <div className="brand-mark">T</div>
          <div className="brand-text">
            <span>ThreatVerse</span>
            <small>AI Defense Platform</small>
          </div>
        </div>

        <nav className="nav">
          <a href="#platform">Platform</a>
          <a href="#solutions">Solutions</a>
          <a href="#insights">Insights</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <button className="nav-cta">Book Demo</button>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">AI-POWERED CYBER THREAT DETECTION</div>
            <h1>
              Detect threats before they become a breach.
            </h1>
            <p>
              ThreatVerse uses machine learning, behavioral analytics, and autonomous response to uncover malicious activity across your digital ecosystem in real time.
            </p>

            <div className="cta-row">
              <button className="primary-btn">Request a Live Demo</button>
              <button className="secondary-btn">Explore Platform</button>
            </div>

            <div className="trust-row">
              <span>Trusted by security teams in:</span>
              <div className="trust-names">
                <span>Finance</span>
                <span>Healthcare</span>
                <span>Cloud</span>
                <span>Enterprise</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Threat detection dashboard preview">
            <div className="dashboard-card main-panel">
              <div className="panel-header">
                <span className="dot green"></span>
                <span>Live Threat Map</span>
              </div>

              <div className="radar-wrap">
                <div className="radar-ring ring-1"></div>
                <div className="radar-ring ring-2"></div>
                <div className="radar-ring ring-3"></div>
                <div className="pulse-point point-1"></div>
                <div className="pulse-point point-2"></div>
                <div className="pulse-point point-3"></div>
                <div className="pulse-point point-4"></div>
              </div>
            </div>

            <div className="dashboard-card side-panel alert-panel">
              <div className="mini-label">Critical Event</div>
              <div className="mini-stat">Ransomware chain</div>
              <div className="mini-bar"><span></span></div>
              <small>Blocked in 41 sec</small>
            </div>

            <div className="dashboard-card side-panel score-panel">
              <div className="mini-label">Threat Score</div>
              <div className="score">97</div>
              <div className="score-grid">
                <span>Malware</span>
                <span>94</span>
                <span>Identity</span>
                <span>89</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats container" id="platform">
          {stats.map((stat) => (
            <div className="stat-box" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="features container" id="solutions">
          <div className="section-heading">
            <div className="eyebrow dark">WHY TEAMS CHOOSE THREATVERSE</div>
            <h2>AI security built to detect what traditional tools miss.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="intel container" id="insights">
          <div className="intel-copy">
            <div className="eyebrow dark">THREAT SIGNALS</div>
            <h2>Continuously monitor for the attack paths you care about most.</h2>
            <ul>
              {signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>

          <div className="intel-panel">
            <div className="panel-top">
              <span>Threat Activity</span>
              <span className="badge">+18.4%</span>
            </div>

            <div className="graph-bars" aria-label="Threat activity chart">
              <span style={{ height: '48%' }}></span>
              <span style={{ height: '58%' }}></span>
              <span style={{ height: '42%' }}></span>
              <span style={{ height: '74%' }}></span>
              <span style={{ height: '63%' }}></span>
              <span style={{ height: '88%' }}></span>
              <span style={{ height: '97%' }}></span>
              <span style={{ height: '72%' }}></span>
            </div>

            <div className="panel-bottom">
              {cards.map((item) => (
                <div className="mini-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="workflow container">
          <div className="section-heading center">
            <div className="eyebrow dark">OPERATING MODEL</div>
            <h2>From signal detection to autonomous response.</h2>
          </div>

          <div className="timeline">
            {timeline.map((item) => (
              <article className="timeline-item" key={item.phase}>
                <div className="phase">{item.phase}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-banner container" id="pricing">
          <div>
            <div className="eyebrow dark">READY FOR FASTER, SMARTER DEFENSE?</div>
            <h2>Secure your environment with AI-powered threat intelligence.</h2>
          </div>
          <button className="primary-btn">Schedule a Consultation</button>
        </section>
      </main>

      <footer className="footer container">
        <div className="brand-wrap">
          <div className="brand-mark">T</div>
          <div className="brand-text">
            <span>ThreatVerse</span>
            <small>AI Defense Platform</small>
          </div>
        </div>
        <p>© 2026 ThreatVerse. Intelligent cyber defense for modern enterprises.</p>
      </footer>
    </div>
  );
}
