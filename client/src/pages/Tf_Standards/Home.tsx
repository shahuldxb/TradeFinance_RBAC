
import { useState, useMemo } from "react";
import { Download, FileText, Sparkles } from "lucide-react";
import { allTabsData, TabData, Category, Standard } from "../../data/standards";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



export default function TFStandards() {
  const [activeTab, setActiveTab] = useState<string>("trade-finance");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentTabData = useMemo(() => {
    return allTabsData.find((tab) => tab.id === activeTab) || allTabsData[0];
  }, [activeTab]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentTabData.categories;
    }

    const query = searchQuery.toLowerCase();
    return currentTabData.categories
      .map((category) => ({
        ...category,
        standards: category.standards.filter(
          (standard) =>
            standard.code.toLowerCase().includes(query) ||
            standard.title.toLowerCase().includes(query) ||
            standard.description.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.standards.length > 0);
  }, [currentTabData, searchQuery]);

  const displayedCategories = useMemo(() => {
    if (activeCategory) {
      return filteredCategories.filter((cat) => cat.id === activeCategory);
    }
    return filteredCategories;
  }, [filteredCategories, activeCategory]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setActiveCategory(null);
    setSearchQuery("");
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const exportToCSV = () => {
    const headers = ["Category", "Code", "Title", "Description"];
    const rows = displayedCategories.flatMap((category) =>
      category.standards.map((standard) => [
        category.name,
        standard.code,
        standard.title,
        standard.description.replace(/"/g, '""'),
      ])
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${currentTabData.name.replace(/\s+/g, "_")}_export.csv`;
    link.click();
  };



  const exportToPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const title = `${currentTabData.name} – Standards`;
    doc.setFontSize(16);
    doc.text(title, 14, 15);

    const headers = [["Category", "Code", "Title", "Description"]];

    const rows = displayedCategories.flatMap((category) =>
      category.standards.map((standard) => [
        category.name,
        standard.code,
        standard.title,
        standard.description,
      ])
    );

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 22,
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [37, 99, 235] }, // blue
    });

    doc.save(`${currentTabData.name.replace(/\s+/g, "_")}_export.pdf`);
  };


  return (
    <div className="min-h-screen relative">
      {/* <StarField /> */}


      {/* Hero Section */}
      <section className="card p-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tab Switcher as badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            {allTabsData.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`btn btn-primary btn-outline flex items-center gap-2 text-xs md:text-md  ${activeTab === tab.id
                  ? "opacity-90"
                  : "opacity-70 hover:opacity-100"
                  }`}

              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span >
              {activeTab === "trade-finance" ? "Trade Finance" : "IT & Cybersecurity"}
            </span>
            <br />
            <span>
              {activeTab === "trade-finance" ? "Discrepancy Solution Finder" : "Standards Reference"}
            </span>
          </h1>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="input input-md w-full border border-blue-300 hover:border-blue-400 text-xs flex items-center gap-2">
              <i className="ki-filled ki-magnifier text-blue-400"></i>
              <input
                type="text"
                placeholder="Search standards by code or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>


          {/* Export buttons */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={exportToCSV}
              className="btn btn-primary btn-outline flex items-center gap-2 text-xs md:text-md"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={exportToPDF}
              className="btn btn-primary btn-outline flex items-center gap-2 text-xs md:text-md"
            >
              <FileText size={16} />
              Export PDF
            </button>
          </div>
        </div>
      </section>

      {/* Standards Content */}
      <main className="card p-5 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {displayedCategories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>

          {/* Empty state */}
          {displayedCategories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No standards found matching your search.
              </p>
              <button
                className="mt-4 btn btn-secondary btn-outline text-xs md:text-md"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="card p-5 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold ">Trade Finance Standards</span>
              </div>
              <p className="text-sm">
                Your comprehensive trade finance standards reference.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Standards</h4>
              <ul className="space-y-2 text-sm ">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Trade Finance Standards</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">IT & Cybersecurity Standards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm ">
                {currentTabData.categories.slice(0, 5).map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        handleCategoryClick(cat.id);

                        // Wait for DOM to update before scrolling
                        setTimeout(() => {
                          const el = document.getElementById(`category-${cat.id}`);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }, 100);
                      }}
                      className="hover:text-blue-400 transition-colors text-left"
                    >
                      {cat.name}
                    </button>


                  </li>
                ))}
              </ul>
            </div>
          </div>
         
        </div>
      </footer>
    </div>
  );
}

function CategorySection({ category }: { category: Category }) {
  return (
    <section id={`category-${category.id}`} className="scroll-mt-24">
      {/* Category Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 mb-4">
          <FileText className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold  mb-2">
          {category.name}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>

      {/* Standards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {category.standards.map((standard, index) => (
          <StandardCard key={standard.id} standard={standard} index={index + 1} />
        ))}
      </div>
    </section>
  );
}

function StandardCard({ standard, index }: { standard: Standard; index: number }) {
  return (
    <div className="card p-6 transition-all duration-300 group hover:border-primary/40">
      <div className="flex gap-4">
        {/* Number Badge */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">
            {index}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className=" text-bold mb-1">{standard.code}</p>
          <h3 className="font-semibold mb-2 transition-colors group-hover:text-primary">
            {standard.title}
          </h3>
          <p className="text-sm leading-relaxed line-clamp-3 group-hover:text-primary/80 transition-colors">
            {standard.description}
          </p>
        </div>
      </div>
    </div>
  );
}

