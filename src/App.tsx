/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { 
  Croissant, 
  UtensilsCrossed, 
  Egg, 
  Leaf, 
  Coffee, 
  Plus, 
  Info,
  MapPin,
  Instagram,
  Facebook,
  FileDown,
  ExternalLink
} from "lucide-react";

const MENU_DATA = {
  bakery: {
    title: "Bakery & Grab-and-Go",
    icon: <Croissant className="w-6 h-6" />,
    items: [
      {
        name: "The Classic Croissant",
        price: "8",
        tags: ["V"],
        description: "Flaky, French-style pastry with local cultured butter."
      },
      {
        name: "Smoked Ham & Melted Cheese Croissant",
        price: "14",
        tags: [],
        description: "Premium smoked ham with melted local cheddar."
      },
      {
        name: "GIGI’s Signature Scrolls",
        price: "14",
        tags: ["V"],
        description: "Cinnamon, Red Velvet, or Biscoff. Ask our team for today's Savoury selection."
      },
      {
        name: "Freshly Baked Muffins",
        price: "8",
        tags: ["V"],
        description: "Savoury (Vegetarian) or Sweet (Raspberry & White Chocolate)."
      }
    ]
  },
  toast: {
    title: "Toast & Light",
    icon: <Leaf className="w-6 h-6" />,
    items: [
      {
        name: "Grated Egg Avocado",
        price: "14",
        tags: ["V", "GFO"],
        description: "Smashed avocado, crumbled feta, grated hard-boiled egg, lemon, house chilli garlic oil, sourdough. (Add Halloumi +6)"
      },
      {
        name: "Whipped Ricotta & Heirloom Tomato",
        price: "14.5",
        tags: ["V", "GFO"],
        description: "Whipped ricotta, house pesto, Confit heirloom tomatoes, Middle Eastern dukkah, sourdough."
      },
      {
        name: "Cured Salmon & Whipped Ricotta",
        price: "22",
        tags: ["GFO"],
        description: "House-cured salmon gravlax, whipped dill ricotta, pickled fennel, fried capers, dark rye."
      },
      {
        name: "PORK BELLY BREAKFAST TOASTIE",
        price: "18",
        tags: [],
        description: "Thick-Cut Pork Belly, Fried Egg, Sriracha Mayo, Swiss Cheese, Pickled Red Cabbage"
      }
    ]
  },
  signature: {
    title: "Signature Brunch",
    subtitle: "The New Classics",
    icon: <Egg className="w-6 h-6" />,
    items: [
      {
        name: "Smoked Pork Belly Roll",
        price: "18",
        tags: ["GFO"],
        description: "12-hour smoked pork belly, fried egg, black garlic aioli, milk bun."
      },
      {
        name: "Ricotta & Apple French Toast",
        price: "24",
        tags: ["V"],
        description: "Sugared brioche, poached apple, whipped ricotta, thick-cut bacon, toasted macadamia, pure maple syrup."
      },
      {
        name: "Blue Swimmer Chilli Crab Scramble",
        price: "28",
        tags: ["GFO"],
        description: "Queensland Blue Swimmer crab, scrambled eggs, house smoky chilli crisp, coriander, sourdough."
      },
      {
        name: "Native Pepperberry Benny",
        price: "26",
        tags: ["GF"],
        description: "12-hour smoked pork belly, poached eggs, crispy potato rosti, Tasmanian pepperberry hollandaise."
      },
      {
        name: "The Modern Aussie Skillet",
        price: "36",
        tags: ["GFO"],
        description: "Premium Wagyu breakfast sausage, pork belly, wild mushrooms, fried eggs, quandong chutney, sourdough."
      }
    ]
  },
  wellness: {
    title: "Wellness & Bowls",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    items: [
      {
        name: "Whipped Greek Yogurt & Granola",
        price: "19",
        tags: ["V", "GF"],
        description: "Whipped Greek yogurt, seasonal poached fruit, almond granola, thyme honey, fresh berries."
      },
      {
        name: "Stracciatella Savoury Oats",
        price: "24",
        tags: ["V", "GFO"],
        description: "Savoury oatmeal, torn burrata, heirloom tomato, crispy shallots, poached egg, house chilli garlic oil."
      }
    ]
  },
  lunch: {
    title: "Lunch & Salads",
    subtitle: "Available from 11am",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    items: [
      {
        name: "Wagyu Cheeseburger",
        price: "28",
        tags: [],
        description: "180g premium Wagyu patty, aged cheddar, smoked scamorza, chilli pickled red onion, black garlic aioli, milk bun. (Add Chips +5)"
      },
      {
        name: "Chilli Prawn & Nduja Linguine",
        price: "35",
        tags: ["DFO"],
        description: "Pan-fried QLD prawns, cherry tomatoes, and lemon-infused linguine with spicy Nduja and garlic oil."
      },
      {
        name: "Tomato Stracciatella Fettuccine",
        price: "32",
        tags: ["V"],
        description: "Torn burrata cheese, fresh tomatoes, and aromatic basil with delicate fettuccine."
      },
      {
        name: "Poached Lemon Chicken Salad",
        price: "29",
        tags: ["GF", "DF"],
        description: "Tender lemon chicken, wild rocket, and toasted pine nuts with citrus vinaigrette."
      }
    ]
  },
  drinks: {
    title: "Tropical Specialty Drinks",
    icon: <Coffee className="w-6 h-6" />,
    items: [
      {
        name: "Signature Cold Brew with Cheesecake Cream",
        price: "9",
        tags: ["V", "GF"],
        description: "Smooth cold brew topped with velvety cheesecake cream and lemon zest."
      },
      {
        name: "Strawberry Collagen Matcha",
        price: "9",
        tags: ["GF"],
        description: "Kyoto Matcha, strawberry puree, plant collagen, oat milk."
      },
      {
        name: "Daintree Iced Chocolate",
        price: "9",
        tags: ["V", "GF"],
        description: "Rich local Daintree cacao whisked with milk and served over ice with a chocolate swirl."
      },
      {
        name: "Tropical Mont Blanc Cold Brew",
        price: "9.5",
        tags: ["V", "GF"],
        description: "18-hour cold brew, Daintree vanilla cream foam, fresh orange zest."
      }
    ]
  },
  extras: {
    title: "Extras",
    icon: <Plus className="w-6 h-6" />,
    items: [
      { name: "Signature Chilli Garlic Oil", price: "2", tags: ["VG", "GF"] },
      { name: "Poached or Fried Egg", price: "4", tags: ["V", "GF"] },
      { name: "Avocado / Halloumi / Bacon", price: "6", tags: ["GF"] },
      { name: "House-cured Salmon", price: "11", tags: ["GF"] }
    ]
  }
};

const MenuItem = ({ name, price, tags, description }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-8 group"
  >
    <div className="menu-item-title">
      <span className="group-hover:text-brand-accent transition-colors duration-300">{name}</span>
      <span className="flex-grow border-b border-dotted border-brand-olive/30 mx-4 mb-1"></span>
      <span className="font-sans text-lg font-normal">{price}</span>
    </div>
    <div className="flex flex-wrap gap-2 mt-1">
      {tags.map((tag: string) => (
        <span key={tag} className="dietary-tag">{tag}</span>
      ))}
    </div>
    {description && <p className="menu-item-description">{description}</p>}
  </motion.div>
);

const Section = ({ title, subtitle, icon, items, activeFilter, filterFn }: any) => {
  const filteredItems = items.filter((item: any) => filterFn(item.tags));

  if (filteredItems.length === 0) return null;

  return (
    <motion.section 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-16"
    >
      <div className="menu-section-title">
        <span className="text-brand-olive">{icon}</span>
        <div>
          <h2>{title}</h2>
          {subtitle && <p className="text-xs font-sans uppercase tracking-[0.2em] text-brand-olive/60 mt-1">{subtitle}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {filteredItems.map((item: any, idx: number) => (
          <MenuItem key={idx} {...item} />
        ))}
      </div>
    </motion.section>
  );
};

export default function App() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const DIETARY_FILTERS = [
    { id: 'ALL', label: 'All' },
    { id: 'V', label: 'Vegetarian' },
    { id: 'VG', label: 'Vegan' },
    { id: 'GF', label: 'Gluten-Free' },
    { id: 'DF', label: 'Dairy-Free' },
  ];

  const filterItem = (itemTags: string[]) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'GF') return itemTags.includes('GF') || itemTags.includes('GFO');
    if (activeFilter === 'DF') return itemTags.includes('DF') || itemTags.includes('DFO');
    return itemTags.includes(activeFilter);
  };

  const handleDownloadPDF = async () => {
    if (!menuRef.current || isGenerating) return;
    
    setIsGenerating(true);
    const element = menuRef.current;

    try {
      // Scroll to top to ensure full capture
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Wait a bit for scroll and layout to stabilize
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#F5F5F0', // brand-cream
        logging: false,
        width: element.offsetWidth,
        height: element.scrollHeight,
        windowWidth: element.offsetWidth,
        windowHeight: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (el) => el.classList.contains('no-print'),
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Calculate dimensions for a single long page
      // A4 width is 210mm. We'll set the PDF width to 210mm and calculate the height proportionally.
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Create PDF with custom size [width, height]
      // jsPDF format can take an array [width, height]
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
        compress: true
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save('GIGI_Menu.pdf');
    } catch (err) {
      console.error("PDF Generation failed:", err);
      // Last resort fallback
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-accent/30" ref={menuRef}>
      {/* Hero Header */}
      <header className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-brand-ink text-brand-cream">
        <div className="absolute top-6 right-6 z-50 no-print flex gap-3">
          <button 
            onClick={() => window.open(window.location.href, '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-brand-ink/40 hover:bg-brand-ink/60 border border-brand-cream/20 rounded-full transition-all duration-300 text-xs font-medium backdrop-blur-md"
            title="새 탭에서 열기"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">새 탭에서 열기</span>
          </button>
          <button 
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-4 py-2 bg-brand-accent hover:bg-brand-accent/80 border border-brand-accent rounded-full transition-all duration-300 text-sm font-medium shadow-lg ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <FileDown className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : ''}`} />
            <span>{isGenerating ? '생성 중...' : 'PDF 다운로드'}</span>
          </button>
        </div>
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
            alt="Cafe Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 border border-brand-cream rounded-full flex items-center justify-center">
              <span className="font-serif text-3xl font-light italic">G</span>
            </div>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl tracking-tighter mb-2">GIGI</h1>
          <p className="font-sans text-sm md:text-base uppercase tracking-[0.4em] opacity-80">Edge Hill • Sophisticated Brunch</p>
        </motion.div>
      </header>

      {/* Main Menu Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        
        {/* Filter Bar */}
        <div className="no-print mb-12 flex flex-wrap justify-center gap-3">
          {DIETARY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full text-[10px] font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
                activeFilter === filter.id
                  ? 'bg-brand-olive text-brand-cream border-brand-olive shadow-md'
                  : 'bg-transparent text-brand-olive/60 border-brand-olive/20 hover:border-brand-olive/40'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <Section {...MENU_DATA.bakery} activeFilter={activeFilter} filterFn={filterItem} />
        <Section {...MENU_DATA.toast} activeFilter={activeFilter} filterFn={filterItem} />
        <Section {...MENU_DATA.signature} activeFilter={activeFilter} filterFn={filterItem} />
        <Section {...MENU_DATA.wellness} activeFilter={activeFilter} filterFn={filterItem} />
        <Section {...MENU_DATA.lunch} activeFilter={activeFilter} filterFn={filterItem} />
        <Section {...MENU_DATA.drinks} activeFilter={activeFilter} filterFn={filterItem} />
        
        {/* Extras Section */}
        {MENU_DATA.extras.items.filter(item => filterItem(item.tags)).length > 0 && (
          <motion.section 
            layout
            className="mt-12 p-8 bg-brand-olive/5 rounded-3xl border border-brand-olive/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <Plus className="w-6 h-6 text-brand-olive" />
              <h2 className="font-serif text-3xl italic">Enhancements</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MENU_DATA.extras.items.filter(item => filterItem(item.tags)).map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-brand-olive/10 pb-2">
                  <div>
                    <span className="font-serif text-lg font-medium">{item.name}</span>
                    <div className="flex gap-1 mt-1">
                      {item.tags.map(tag => <span key={tag} className="dietary-tag !text-[8px] !px-1">{tag}</span>)}
                    </div>
                  </div>
                  <span className="font-sans text-sm font-medium">{item.price}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer Info */}
        <footer className="mt-24 pt-12 border-t border-brand-olive/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="font-serif text-xl mb-4 italic">Dietary Key</h3>
              <div className="grid grid-cols-2 gap-y-2 font-sans text-[10px] uppercase tracking-wider text-brand-ink/60">
                <p>(V) Vegetarian</p>
                <p>(VG) Vegan</p>
                <p>(GF) Gluten-Free</p>
                <p>(DF) Dairy-Free</p>
                <p>(GFO) GF Option</p>
                <p>(VGO) Vegan Option</p>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl mb-4 italic">Sustainability</h3>
              <p className="font-sans text-sm text-brand-ink/70 leading-relaxed">
                We believe in conscious dining. Swap avocado for our crushed mint peas 
                <span className="text-brand-olive font-medium"> (Pea-camole) </span> 
                upon request to support local water conservation.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <h3 className="font-serif text-xl mb-4 italic">Edge Hill Locals</h3>
              <div className="bg-brand-olive text-brand-cream p-4 rounded-xl text-center md:text-right max-w-xs">
                <p className="font-sans text-[10px] uppercase tracking-widest mb-2">Community Benefits</p>
                <p className="font-serif text-sm italic">Present your Locals Card for exclusive Edge Hill benefits.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-brand-ink/40 text-[10px] uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>Edge Hill, QLD</span>
            </div>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/gigi_edgehill/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                <Instagram className="w-4 h-4 cursor-pointer" />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                <Facebook className="w-4 h-4 cursor-pointer" />
              </a>
            </div>
            <p>© {new Date().getFullYear()} GIGI CAFE</p>
          </div>
        </footer>
      </main>

      {/* Floating Info Toggle (Optional) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 no-print">
        <button 
          onClick={handleDownloadPDF}
          className="px-6 h-14 bg-brand-accent text-brand-cream rounded-full shadow-2xl flex items-center gap-3 hover:bg-brand-olive transition-all duration-300 group"
          title="Download PDF"
        >
          <FileDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="font-medium">PDF 다운로드</span>
        </button>
      </div>
    </div>
  );
}
