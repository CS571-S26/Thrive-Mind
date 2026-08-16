import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Icon from "./Icon";

// Verified directly against uhs.wisc.edu (Aug 2026). If UHS restructures
// their site, re-check these before trusting the links/numbers again.
const uwSupportRows = [
  {
    need: "Crisis (24/7)",
    resource: "UHS Crisis Support Line",
    desc: "Call 608-265-5600, option 9 — staffed 24/7 by licensed professionals.",
    link: "https://www.uhs.wisc.edu/mental-health/"
  },
  {
    need: "Counseling",
    resource: "Individual Counseling",
    desc: "Free, confidential one-on-one sessions with a UHS counselor.",
    link: "https://www.uhs.wisc.edu/mental-health/individual/"
  },
  {
    need: "Drop-in support",
    resource: "Let's Talk",
    desc: "No appointment needed — informal, confidential drop-in consultations around campus.",
    link: "https://www.uhs.wisc.edu/mental-health/lets-talk/"
  },
  {
    need: "Peer support",
    resource: "Group Counseling",
    desc: "Small groups (6–8 students) to connect with others facing similar experiences.",
    link: "https://uhs.wisc.edu/mental-health/group-counseling/"
  },
  {
    need: "Self-guided tools",
    resource: "Thrive Online",
    desc: "Self-paced modules on test anxiety, stress management, and procrastination.",
    link: "https://www.uhs.wisc.edu/mental-health/thrive-online/"
  },
  {
    need: "Graduate students",
    resource: "Graduate School Student Wellbeing",
    desc: "Wellbeing support and resource referral specifically for graduate students.",
    link: "https://grad.wisc.edu/current-students/wellbeing/"
  }
];

const sections = [
  {
    id: "crisis-hotlines",
    title: "🆘 Crisis Hotlines",
    color: "#A6403D",
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
    id: "find-a-therapist",
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
    id: "psychiatrists-medication",
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
    id: "mental-health-apps",
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
    id: "online-counseling",
    title: "💻 Online Counseling",
    color: "#1F7A46",
    items: [
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
    id: "self-help-education",
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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const target = searchParams.get("section");
    if (!target) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-4">
      <div className="card-style">
        <h1 className="page-title">
          <Icon name="book" size={28} /> Resources
        </h1>

        <p className="resources-intro">
          You are not alone. Here are trusted resources to help you find the
          right support — from crisis lines to therapists, apps, and more.
        </p>

        <section id="uw-madison-support" className="resources-section">
          <h2 className="resources-section-title uw-support-title">
            🎓 UW–Madison Support
          </h2>

          <p className="uw-support-subtitle">
            Thrive Mind was built for UW–Madison students. These are the
            university's own mental health services, verified directly
            against uhs.wisc.edu.
          </p>

          <div className="uw-support-table">
            {uwSupportRows.map((row) => (
              <a
                key={row.need}
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
                className="uw-support-row"
                aria-label={`${row.need}: ${row.resource} — ${row.desc}`}
              >
                <span className="uw-support-need">{row.need}</span>
                <span className="uw-support-resource">
                  <strong>{row.resource}</strong>
                  <span className="uw-support-desc">{row.desc}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {sections.map((section, si) => (
          <section
            key={si}
            id={section.id}
            className="resources-section"
            style={{ "--card-accent": section.color }}
          >
            <h2 className="resources-section-title">{section.title}</h2>

            <Row className="g-3">
              {section.items.map((item, ii) => (
                <Col key={ii} md={6}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resources-card-link"
                    aria-label={`${item.name}: ${item.desc}`}
                  >
                    <div className="resources-card">
                      <h3 className="resources-card-title">{item.name}</h3>

                      <p className="resources-card-desc">{item.desc}</p>

                      <div className="resources-card-label">
                        🔗 {item.label}
                      </div>
                    </div>
                  </a>
                </Col>
              ))}
            </Row>
          </section>
        ))}

        <div className="resources-footer-note">
          💜 Reaching out is a sign of strength. You deserve support.
        </div>
      </div>
    </Container>
  );
}

export default Resources;