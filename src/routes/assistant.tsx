import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  Trash2,
  AlertTriangle,
  ArrowRight,
  Leaf,
  Bot,
  User,
  HeartHandshake,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Ayurveda Assistant — Classical Guidance & Therapy FAQs" },
      {
        name: "description",
        content:
          "Ask our AI Ayurveda assistant about doshas, Panchakarma preparation, diet and lifestyle guidance according to classical texts.",
      },
    ],
  }),
  component: AssistantPage,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  showBookingCta?: boolean;
}

const AYURVEDA_KNOWLEDGE = {
  panchakarma: `**Panchakarma (पञ्चकर्म)** is classical Ayurveda's primary five-fold bio-purification process designed to eliminate deep-seated metabolic toxins (*Ama*) and restore doshic equilibrium.

### The Five Therapies:
1. **Vamana (Emesis)**: Clears aggravated Kapha from the chest and stomach (asthma, skin disorders).
2. **Virechana (Purgation)**: Cleanses Pitta from the liver and intestines (skin conditions, acidity, metabolism).
3. **Basti (Medicated Enema)**: The master therapy for Vata disorders (arthritis, sciatica, constipation).
4. **Nasya (Nasal Drops)**: Clears head and neck channels (migraines, cervical stiffness, sinus).
5. **Raktamokshana (Bloodletting)**: Removes localised impure blood (varicose veins, eczema).

### Essential Preparation (*Purvakarma*):
Before any cleansing, your body undergoes:
- **Deepana & Pachana**: Digestive herbs to kindle Agni (*digestive fire*).
- **Snehapana**: Internal intake of medicated ghee for 3-7 days to lubricate tissues.
- **Swedana**: Herbal steam therapy to liquefy toxins and guide them to the gut for elimination.`,

  vata: `**Vata Dosha (वातः)** governs all bodily movement, nervous impulses, circulation, and respiration. Formed by the air (*Vayu*) and space (*Akasha*) elements.

### Signs of Vata Imbalance:
- Joint stiffness, cracking sounds (*Sandhivata*), body aches.
- Dry skin, brittle hair, irregular digestion, constipation, and bloating.
- Restlessness, anxiety, light sleep, and racing thoughts.

### Balancing Recommendations:
- **Diet (*Pathya*)**: Warm, moist, freshly cooked foods. Favour ghee, warm soups, soaked almonds, ginger, and cumin. Avoid cold salads and dry crackers.
- **Herbs**: Ashwagandha, Dashamoola, Shallaki, and Rasna.
- **Therapies**: Warm Abhyanga (sesame oil full-body massage), Kati Basti, and Shirodhara.`,

  pitta: `**Pitta Dosha (पित्तम्)** governs digestion, transformation, body temperature, and intelligence. Formed by fire (*Agni*) and water (*Jala*) elements.

### Signs of Pitta Imbalance:
- Hyperacidity, acid reflux, heartburn, and skin redness/rashes.
- Excess body heat, excessive thirst, and irritable mood.
- Early greying, inflammation in joints or organs.

### Balancing Recommendations:
- **Diet (*Pathya*)**: Cooling, sweet, bitter, and astringent foods. Favour sweet fruits, cucumber, coriander, coconut water, and cow's ghee. Avoid excessively spicy, fermented, or deep-fried foods.
- **Herbs**: Shatavari, Guduchi, Amalaki (Indian Gooseberry), and Chandana.
- **Therapies**: Takradhara (buttermilk pour), Shirodhara, and Virechana.`,

  kapha: `**Kapha Dosha (कफः)** provides structure, lubrication, stamina, and stability. Formed by water (*Jala*) and earth (*Prithvi*) elements.

### Signs of Kapha Imbalance:
- Sluggish digestion, feeling heavy after meals, water retention, and weight gain.
- Excess mucus, chronic congestion, lethargy, and oversleeping.

### Balancing Recommendations:
- **Diet (*Pathya*)**: Warm, light, pungent, bitter, and astringent foods. Favour millets, barley, ginger, black pepper, and honey. Minimise heavy dairy, sweets, and oily foods.
- **Herbs**: Trikatu, Triphala, Guggulu, and Tulsi.
- **Therapies**: Udvartana (herbal powder massage) and Vamana therapy.`,

  sleep: `### Ayurvedic Guidance for Restful Sleep (*Nidra*):
In Ayurveda, *Nidra* is one of the three pillars of life (*Trayopasthambha*). Disturbed sleep is predominantly a Vata-Pitta disturbance.

1. **Padabhyanga**: Massage the soles of your feet with warm sesame or Brahmi oil before bed for 5 minutes.
2. **Warm Nutmeg Milk**: Sip a cup of warm boiled milk with a pinch of organic nutmeg (*Jatiphala*) and cardamom 30 minutes before sleep.
3. **Digital Sunset**: Disconnect from screens at least 1 hour before sleeping.
4. **Dinacharya Alignment**: Favour sleeping before 10:00 PM (during the heavy Kapha period) to fall asleep easily.
5. **Therapy Recommendation**: Shirodhara with medicated oils gently calms the autonomic nervous system.`,

  arthritis: `### Ayurvedic Approach to Joint Pain (*Sandhivata*):
Classical Ayurveda views joint pain and degenerative arthritis as an accumulation of aggravated **Vata** in the *Asthi* (bone) and *Sandhi* (joints), causing dryness and wear of natural lubricants (*Shleshaka Kapha*).

### Recommended Protocol:
1. **Never use ice packs**: Vata is cold and dry; cold application aggravates stiffness. Always favour warm herbal compresses.
2. **Abhyanga**: Daily gentle massage with Mahanarayana or Kottamchukkadi taila.
3. **Hospital Therapies**:
   - **Elakizhi / Podikizhi**: Heated herbal leaf boluses that ease inflammation and swelling.
   - **Janu Basti**: Warm medicated oil held in herbal dough wells over the knee joints.
   - **Basti**: Colon cleansing enemas that treat Vata at its root site.`,
};

function generateAyurvedicResponse(query: string): { text: string; showBooking: boolean } {
  const q = query.toLowerCase();

  if (q.includes("panchakarma") || q.includes("detox") || q.includes("cleanse") || q.includes("vamana") || q.includes("virechana") || q.includes("basti")) {
    return {
      text: AYURVEDA_KNOWLEDGE.panchakarma,
      showBooking: true,
    };
  }

  if (q.includes("vata") || q.includes("dry") || q.includes("constipat") || q.includes("gas") || q.includes("bloat") || q.includes("nerve")) {
    return {
      text: AYURVEDA_KNOWLEDGE.vata,
      showBooking: true,
    };
  }

  if (q.includes("pitta") || q.includes("acid") || q.includes("heat") || q.includes("reflux") || q.includes("heartburn") || q.includes("rash")) {
    return {
      text: AYURVEDA_KNOWLEDGE.pitta,
      showBooking: true,
    };
  }

  if (q.includes("kapha") || q.includes("weight") || q.includes("mucus") || q.includes("cold") || q.includes("cough") || q.includes("sinus") || q.includes("sluggish")) {
    return {
      text: AYURVEDA_KNOWLEDGE.kapha,
      showBooking: true,
    };
  }

  if (q.includes("sleep") || q.includes("insomnia") || q.includes("anxiety") || q.includes("stress") || q.includes("rest")) {
    return {
      text: AYURVEDA_KNOWLEDGE.sleep,
      showBooking: true,
    };
  }

  if (q.includes("joint") || q.includes("arthrit") || q.includes("knee") || q.includes("back pain") || q.includes("stiff") || q.includes("pain")) {
    return {
      text: AYURVEDA_KNOWLEDGE.arthritis,
      showBooking: true,
    };
  }

  // General foundational response
  return {
    text: `Ayurveda seeks the root cause of every symptom by understanding the balance of your unique constitution (*Prakriti*) and current imbalance (*Vikriti*).

### Foundational Principles for Wellbeing:
1. **Agni (Digestive Fire)**: The root of health. Sip warm water through the day and eat only when true hunger is present.
2. **Dinacharya (Daily Routine)**: Wake up with the sunrise, cleanse the senses (tongue scraping, warm water rinse), and practice gentle movement.
3. **Mindful Eating**: Avoid heavy meals after 8:00 PM; dinner should be light and easily digestible like steamed vegetables and moong dal.
4. **Three Doshas**: All conditions stem from Vata, Pitta, or Kapha irregularities.

For a personalized pulse diagnosis (*Nadi Pariksha*) and custom herbal formulation, we invite you to consult our hospital physicians.`,
    showBooking: true,
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    role: "assistant",
    content:
      "Namaste! I am your Aarogya Ayurveda assistant. You can ask me about your dosha symptoms, dietary guidance, herbs, or how to prepare for Panchakarma therapies.",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

function AssistantPage() {
  const { user } = useAuth();
  const storageKey = user ? `ayurveda_assistant_${user.id}` : "ayurveda_assistant_guest";

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return INITIAL_MESSAGES;
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save conversation automatically to patient account local storage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch (err) {
      console.error("Storage save error", err);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, storageKey]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const { text: responseText, showBooking } = generateAyurvedicResponse(text);
      const assistantMsg: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showBookingCta: showBooking,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClearHistory = () => {
    if (confirm("Reset and clear your conversation history?")) {
      setMessages(INITIAL_MESSAGES);
      localStorage.removeItem(storageKey);
    }
  };

  const quickPrompts = [
    "How do I prepare for Panchakarma?",
    "Diet to balance aggravated Vata",
    "Natural remedies for hyperacidity & Pitta",
    "Ayurvedic daily routine for deep sleep",
    "What therapies help knee pain and arthritis?",
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <Badge variant="secondary" className="mb-1 gap-1 text-xs">
              <Sparkles className="size-3 text-primary" /> Classical Ayurveda AI
            </Badge>
            <h1 className="font-display text-3xl">Ayurveda Health Assistant</h1>
            <p className="text-xs text-muted-foreground">
              Educational answers on doshas, diet, herbal remedies, and Panchakarma preparation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearHistory}
              className="gap-1 text-xs text-muted-foreground"
            >
              <Trash2 className="size-3.5" /> Clear History
            </Button>
            <Button asChild size="sm">
              <Link to="/book">Book Consultation</Link>
            </Button>
          </div>
        </div>

        {/* Clinical Disclaimer Alert Banner */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle className="size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="font-semibold">Educational Guidance Only — Not a Medical Diagnosis</p>
            <p className="mt-0.5 text-amber-800/90 dark:text-amber-300/90">
              This assistant provides classical Ayurvedic principles and general wellness advice. It does
              not replace individual clinical examination or pulse diagnosis. Please consult our hospital
              physicians before starting any intense therapies or medicinal formulas.
            </p>
          </div>
        </div>

        {/* Quick Topic Chips */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Suggested Topics:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Stream Window */}
        <Card className="border-border shadow-[var(--shadow-lift)]">
          <CardContent className="flex flex-col p-4 sm:p-6 min-h-[460px] max-h-[640px] overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
                    <Bot className="size-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-secondary/30 text-foreground"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {m.showBookingCta && (
                    <div className="mt-4 rounded-xl border border-primary/20 bg-background/80 p-3 text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-primary">
                        <HeartHandshake className="size-4" /> Ready for personal Ayurvedic care?
                      </div>
                      <p className="mt-1 text-muted-foreground text-[11px]">
                        Our experienced physicians conduct in-depth pulse diagnostics and formulate customized
                        herbal treatments.
                      </p>
                      <Button asChild size="sm" className="mt-3 gap-1.5 text-xs">
                        <Link to="/book">
                          Book Consultation <ArrowRight className="size-3" />
                        </Link>
                      </Button>
                    </div>
                  )}

                  <div
                    className={`mt-2 text-[10px] ${
                      m.role === "user" ? "text-primary-foreground/70 text-right" : "text-muted-foreground"
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>

                {m.role === "user" && (
                  <div className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-foreground">
                    <User className="size-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="size-4" />
                </div>
                <div className="rounded-2xl border border-border bg-secondary/30 p-3 text-xs text-muted-foreground">
                  <span className="animate-pulse">Consulting classical Ayurvedic texts…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Bar */}
          <div className="border-t border-border p-3 sm:p-4 bg-card/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Ask about your symptoms, doshas, herbs, or Panchakarma..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="text-xs sm:text-sm"
              />
              <Button type="submit" disabled={!input.trim() || isTyping} className="gap-1.5 shrink-0">
                <Send className="size-4" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
