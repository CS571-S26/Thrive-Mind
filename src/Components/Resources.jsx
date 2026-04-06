import { Container, Row, Col } from "react-bootstrap";

const sections = [
  {
    title: "🆘 Crisis Hotlines",
    color: "#E07BA0",
    items: [
      { name: "988 Suicide & Crisis Lifeline", desc: "Call or text 988 — 24/7 free and confidential support.", link: "https://988lifeline.org", label: "Visit 988lifeline.org" },
      { name: "Crisis Text Line", desc: "Text HOME to 741741 to reach a trained crisis counselor.", link: "https://www.crisistextline.org", label: "crisistextline.org" },
      { name: "NAMI Helpline", desc: "1-800-950-6264 — National Alliance on Mental Illness support line.", link: "https://www.nami.org/help", label: "nami.org/help" },
      { name: "SAMHSA Helpline", desc: "1-800-662-4357 — Free, confidential, 24/7 treatment referral service.", link: "https://www.samhsa.gov/find-help/national-helpline", label: "samhsa.gov" },
    ]
  },
  {
    title: "🩺 Find a Therapist",
    color: "#7B61FF",
    items: [
      { name: "Psychology Today", desc: "Search thousands of therapists by location, specialty, and insurance.", link: "https://www.psychologytoday.com/us/therapists", label: "Find a therapist" },
      { name: "Open Path Collective", desc: "Affordable therapy sessions ($30–$80) for those without insurance.", link: "https://openpathcollective.org", label: "openpathcollective.org" },
      { name: "TherapyDen", desc: "Find therapists with a focus on inclusivity and social justice.", link: "https://www.therapyden.com", label: "therapyden.com" },
      { name: "Zocdoc", desc: "Book appointments with psychiatrists and therapists who take insurance.", link: "https://www.zocdoc.com/conditions/psychiatry", label: "Book on Zocdoc" },
    ]
  },
  {
    title: "💊 Psychiatrists & Medication",
    color: "#4A90E2",
    items: [
      { name: "Talkiatry", desc: "In-network psychiatrists for medication management via telehealth.", link: "https://www.talkiatry.com", label: "talkiatry.com" },
      { name: "Cerebral", desc: "Online psychiatry and therapy with same-week appointments.", link: "https://cerebral.com", label: "cerebral.com" },
      { name: "NAMI Provider Finder", desc: "Locate psychiatrists in your area through NAMI's directory.", link: "https://www.nami.org/Support-Education/NAMI-HelpLine", label: "nami.org" },
      { name: "Brightside Health", desc: "Psychiatry + therapy for depression and anxiety via telehealth.", link: "https://www.brightside.com", label: "brightside.com" },
    ]
  },
  {
    title: "📱 Mental Health Apps",
    color: "#C084FC",
    items: [
      { name: "Headspace", desc: "Guided meditation and mindfulness for stress, sleep, and focus.", link: "https://www.headspace.com", label: "headspace.com" },
      { name: "Calm", desc: "Sleep stories, breathing exercises, and meditations.", link: "https://www.calm.com", label: "calm.com" },
      { name: "Woebot", desc: "AI-powered chatbot using CBT techniques for daily mood support.", link: "https://woebothealth.com", label: "woebothealth.com" },
      { name: "Wysa", desc: "Emotionally intelligent AI companion for mental wellness.", link: "https://www.wysa.com", label: "wysa.com" },
    ]
  },
  {
    title: "🎓 Campus & Online Counseling",
    color: "#27AE60",
    items: [
      { name: "UW-Madison UHS Counseling", desc: "Free and low-cost counseling for UW-Madison students.", link: "https://uhs.wisc.edu/mental-health/", label: "uhs.wisc.edu" },
      { name: "BetterHelp", desc: "Online therapy with licensed counselors starting at ~$60/week.", link: "https://www.betterhelp.com", label: "betterhelp.com" },
      { name: "Talkspace", desc: "Text, voice, and video therapy with licensed therapists.", link: "https://www.talkspace.com", label: "talkspace.com" },
      { name: "7 Cups", desc: "Free online chat with trained listeners; also offers paid therapy.", link: "https://www.7cups.com", label: "7cups.com" },
    ]
  },
  {
    title: "📖 Self-Help & Education",
    color: "#E8A838",
    items: [
      { name: "MentalHealth.gov", desc: "Government resource for mental health basics, finding care, and more.", link: "https://www.mentalhealth.gov", label: "mentalhealth.gov" },
      { name: "Mind (UK)", desc: "Comprehensive guides to mental health conditions and treatments.", link: "https://www.mind.org.uk", label: "mind.org.uk" },
      { name: "NAMI Learn More", desc: "Educational resources on specific conditions like depression and anxiety.", link: "https://www.nami.org/About-Mental-Illness", label: "nami.org" },
      { name: "Verywell Mind", desc: "Evidence-based articles written by mental health professionals.", link: "https://www.verywellmind.com", label: "verywellmind.com" },
    ]
  },
];

function Resources() {
  return (
    <Container className="mt-4">
      <div className="card-style">
        <h2 style={{ marginBottom: "6px" }}>📚 Resources</h2>
        <p style={{ color: "#6b7280", marginBottom: "28px" }}>
          You are not alone. Here are trusted resources to help you find the right support — from crisis lines to therapists, apps, and more.
        </p>

        {sections.map((section, si) => (
          <div key={si} style={{ marginBottom: "32px" }}>
            <h4 style={{ color: section.color, marginBottom: "14px", borderBottom: `2px solid ${section.color}22`, paddingBottom: "8px" }}>
              {section.title}
            </h4>
            <Row className="g-3">
              {section.items.map((item, ii) => (
                <Col key={ii} md={6}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        padding: "14px 16px",
                        borderRadius: "12px",
                        border: `1.5px solid ${section.color}33`,
                        background: `${section.color}07`,
                        height: "100%",
                        transition: "all 0.18s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 16px ${section.color}30`}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                    >
                      <div style={{ fontWeight: "700", color: section.color, marginBottom: "4px", fontSize: "0.97rem" }}>
                        {item.name}
                      </div>
                      <div style={{ color: "#5a5a5a", fontSize: "0.85rem", lineHeight: "1.4", marginBottom: "8px" }}>
                        {item.desc}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: section.color, opacity: 0.8 }}>
                        🔗 {item.label}
                      </div>
                    </div>
                  </a>
                </Col>
              ))}
            </Row>
          </div>
        ))}

        <div style={{
          textAlign: "center",
          marginTop: "8px",
          padding: "16px",
          borderRadius: "12px",
          background: "rgba(123,97,255,0.06)",
          color: "#7B61FF",
          fontSize: "0.9rem"
        }}>
          💜 Reaching out is a sign of strength. You deserve support.
        </div>
      </div>
    </Container>
  );
}

export default Resources;