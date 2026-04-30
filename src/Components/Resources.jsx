import { Container, Row, Col } from "react-bootstrap";

const sections = [
  {
    title: "🆘 Crisis Hotlines",
    color: "#B24373",
    items: [
      {
        name: "988 Suicide & Crisis Lifeline",
        desc: "Call or text 988 — 24/7 free and confidential support.",
        link: "https://988lifeline.org",
        label: "Visit 988lifeline.org"
      },
      {
        name: "Crisis Text Line",
        desc: "Text HOME to 741741 to reach a trained crisis counselor.",
        link: "https://www.crisistextline.org",
        label: "crisistextline.org"
      },
      {
        name: "NAMI Helpline",
        desc: "1-800-950-6264 — National Alliance on Mental Illness support line.",
        link: "https://www.nami.org/help",
        label: "nami.org/help"
      },
      {
        name: "SAMHSA Helpline",
        desc: "1-800-662-4357 — Free, confidential, 24/7 treatment referral service.",
        link: "https://www.samhsa.gov/find-help/national-helpline",
        label: "samhsa.gov"
      }
    ]
  },
  {
    title: "🩺 Find a Therapist",
    color: "#5B45D6",
    items: [
      {
        name: "Psychology Today",
        desc: "Search thousands of therapists by location, specialty, and insurance.",
        link: "https://www.psychologytoday.com/us/therapists",
        label: "Find a therapist"
      },
      {
        name: "Open Path Collective",
        desc: "Affordable therapy sessions for those without insurance.",
        link: "https://openpathcollective.org",
        label: "openpathcollective.org"
      },
      {
        name: "TherapyDen",
        desc: "Find therapists with a focus on inclusivity and social justice.",
        link: "https://www.therapyden.com",
        label: "therapyden.com"
      },
      {
        name: "Zocdoc",
        desc: "Book appointments with psychiatrists and therapists who take insurance.",
        link: "https://www.zocdoc.com/conditions/psychiatry",
        label: "Book on Zocdoc"
      }
    ]
  },
  {
    title: "💊 Psychiatrists & Medication",
    color: "#2C6FB3",
    items: [
      {
        name: "Talkiatry",
        desc: "In-network psychiatrists for medication management via telehealth.",
        link: "https://www.talkiatry.com",
        label: "talkiatry.com"
      },
      {
        name: "Cerebral",
        desc: "Online psychiatry and therapy with same-week appointments.",
        link: "https://cerebral.com",
        label: "cerebral.com"
      },
      {
        name: "NAMI Provider Finder",
        desc: "Locate psychiatrists in your area through NAMI's directory.",
        link: "https://www.nami.org/Support-Education/NAMI-HelpLine",
        label: "nami.org"
      },
      {
        name: "Brightside Health",
        desc: "Psychiatry and therapy for depression and anxiety via telehealth.",
        link: "https://www.brightside.com",
        label: "brightside.com"
      }
    ]
  },
  {
    title: "📱 Mental Health Apps",
    color: "#7A4FB3",
    items: [
      {
        name: "Headspace",
        desc: "Guided meditation and mindfulness for stress, sleep, and focus.",
        link: "https://www.headspace.com",
        label: "headspace.com"
      },
      {
        name: "Calm",
        desc: "Sleep stories, breathing exercises, and meditations.",
        link: "https://www.calm.com",
        label: "calm.com"
      },
      {
        name: "Woebot",
        desc: "AI-powered chatbot using CBT techniques for daily mood support.",
        link: "https://woebothealth.com",
        label: "woebothealth.com"
      },
      {
        name: "Wysa",
        desc: "Emotionally intelligent AI companion for mental wellness.",
        link: "https://www.wysa.com",
        label: "wysa.com"
      }
    ]
  },
  {
    title: "🎓 Campus & Online Counseling",
    color: "#1F7A46",
    items: [
      {
        name: "UW-Madison UHS Counseling",
        desc: "Free and low-cost counseling for UW-Madison students.",
        link: "https://uhs.wisc.edu/mental-health/",
        label: "uhs.wisc.edu"
      },
      {
        name: "BetterHelp",
        desc: "Online therapy with licensed counselors.",
        link: "https://www.betterhelp.com",
        label: "betterhelp.com"
      },
      {
        name: "Talkspace",
        desc: "Text, voice, and video therapy with licensed therapists.",
        link: "https://www.talkspace.com",
        label: "talkspace.com"
      },
      {
        name: "7 Cups",
        desc: "Free online chat with trained listeners and paid therapy options.",
        link: "https://www.7cups.com",
        label: "7cups.com"
      }
    ]
  },
  {
    title: "📖 Self-Help & Education",
    color: "#8A5A00",
    items: [
      {
        name: "MentalHealth.gov",
        desc: "Government resource for mental health basics, finding care, and more.",
        link: "https://www.mentalhealth.gov",
        label: "mentalhealth.gov"
      },
      {
        name: "Mind",
        desc: "Comprehensive guides to mental health conditions and treatments.",
        link: "https://www.mind.org.uk",
        label: "mind.org.uk"
      },
      {
        name: "NAMI Learn More",
        desc: "Educational resources on specific conditions like depression and anxiety.",
        link: "https://www.nami.org/About-Mental-Illness",
        label: "nami.org"
      },
      {
        name: "Verywell Mind",
        desc: "Evidence-based articles written by mental health professionals.",
        link: "https://www.verywellmind.com",
        label: "verywellmind.com"
      }
    ]
  }
];

function Resources() {
  return (
    <Container className="mt-4">
      <div className="card-style">
        <h1 style={{ marginBottom: "6px" }}>📚 Resources</h1>

        <p style={{ color: "#4B5563", marginBottom: "28px" }}>
          You are not alone. Here are trusted resources to help you find the
          right support — from crisis lines to therapists, apps, and more.
        </p>

        {sections.map((section, si) => (
          <section key={si} style={{ marginBottom: "32px" }}>
            <h2
              style={{
                color: section.color,
                marginBottom: "14px",
                borderBottom: `2px solid ${section.color}33`,
                paddingBottom: "8px",
                fontSize: "1.35rem"
              }}
            >
              {section.title}
            </h2>

            <Row className="g-3">
              {section.items.map((item, ii) => (
                <Col key={ii} md={6}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    aria-label={`${item.name}: ${item.desc}`}
                  >
                    <div
                      style={{
                        padding: "14px 16px",
                        borderRadius: "12px",
                        border: `1.5px solid ${section.color}33`,
                        background: `${section.color}08`,
                        height: "100%",
                        transition: "all 0.18s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow = `0 4px 16px ${section.color}30`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = "none")
                      }
                    >
                      <h3
                        style={{
                          fontWeight: "700",
                          color: section.color,
                          marginBottom: "4px",
                          fontSize: "0.97rem"
                        }}
                      >
                        {item.name}
                      </h3>

                      <p
                        style={{
                          color: "#3F3F46",
                          fontSize: "0.85rem",
                          lineHeight: "1.4",
                          marginBottom: "8px"
                        }}
                      >
                        {item.desc}
                      </p>

                      <div
                        style={{
                          fontSize: "0.82rem",
                          color: section.color,
                          fontWeight: "600"
                        }}
                      >
                        🔗 {item.label}
                      </div>
                    </div>
                  </a>
                </Col>
              ))}
            </Row>
          </section>
        ))}

        <div
          style={{
            textAlign: "center",
            marginTop: "8px",
            padding: "16px",
            borderRadius: "12px",
            background: "rgba(123,97,255,0.06)",
            color: "#5B45D6",
            fontSize: "0.9rem",
            fontWeight: "600"
          }}
        >
          💜 Reaching out is a sign of strength. You deserve support.
        </div>
      </div>
    </Container>
  );
}

export default Resources;