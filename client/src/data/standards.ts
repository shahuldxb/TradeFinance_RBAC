export interface Standard {
  id: number;
  code: string;
  title: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  standards: Standard[];
}

export interface TabData {
  id: string;
  name: string;
  description: string;
  categories: Category[];
}

export const tradeFinanceData: TabData = {
  id: "trade-finance",
  name: "Trade Finance Standards",
  description: "Your comprehensive reference for international trade finance standards, ICC rules, and regulatory compliance guidelines.",
  
  categories: [
    {
      id: "tf-core",
      name: "Trade Finance Standards",
      description: "Core ICC rules and standards governing international trade finance",
      standards: [
        { id: 1, code: "UCP 600", title: "Uniform Customs and Practice for Documentary Credits (2007 Revision)", description: "The universally accepted set of rules governing documentary credits worldwide. Published by ICC, it defines the rights and responsibilities of all parties in LC transactions. Adopted by banks in over 175 countries, it provides a standardized framework for international trade payments. Essential for ensuring consistency and reducing disputes in documentary credit operations." },
        { id: 2, code: "ISBP 821", title: "International Standard Banking Practice for the Examination of Documents under UCP 600", description: "Comprehensive guidance on how banks should examine documents presented under documentary credits. Provides detailed interpretations of UCP 600 articles with practical examples. Helps document checkers identify discrepancies and understand acceptable document formats. Updated regularly to address emerging issues in international trade documentation." },
        { id: 3, code: "URC 522", title: "Uniform Rules for Collections", description: "ICC rules governing documentary and clean collection transactions worldwide. Defines the obligations of banks handling collection instructions from exporters. Covers procedures for presenting documents, obtaining payment, and handling dishonored items. Essential for banks and traders using collection as a payment method in international trade." },
        { id: 4, code: "URDG 758", title: "Uniform Rules for Demand Guarantees", description: "The global standard for demand guarantees and counter-guarantees in international trade. Provides clear rules for issuance, amendment, and payment of guarantees. Balances the interests of applicants, beneficiaries, and guarantors fairly. Widely adopted by banks and corporates for construction, trade, and financial guarantees." },
        { id: 5, code: "ISP98", title: "International Standby Practices", description: "Specialized rules for standby letters of credit used as guarantee instruments. Developed by the Institute of International Banking Law & Practice. Addresses unique features of standbys that differ from commercial documentary credits. Widely used in the United States and increasingly adopted internationally." },
        { id: 6, code: "URR 725", title: "Uniform Rules for Bank-to-Bank Reimbursements under Documentary Credits", description: "ICC rules governing reimbursement arrangements between banks in LC transactions. Defines the obligations of reimbursing banks, claiming banks, and issuing banks. Ensures timely and accurate settlement of inter-bank claims under documentary credits. Critical for efficient functioning of the international LC payment system." },
        { id: 7, code: "eUCP 2.0", title: "Supplement to UCP 600 for Electronic Presentation", description: "Rules enabling electronic presentation of documents under documentary credits. Supplements UCP 600 to accommodate digital trade documentation. Addresses format, authentication, and examination of electronic records. Essential for banks and traders transitioning to paperless trade finance." },
        { id: 8, code: "eURC 1.0", title: "Supplement to URC 522 for Electronic Presentation", description: "Extension of collection rules to cover electronic document presentation. Enables digital transformation of documentary collection processes. Defines standards for electronic records in collection transactions. Supports the industry's move toward paperless trade operations." },
        { id: 9, code: "URBPO 750", title: "Uniform Rules for Bank Payment Obligations", description: "ICC rules for bank payment obligations as an alternative to documentary credits. Enables automated matching of trade data between buyer and seller banks. Provides irrevocable payment undertaking based on data matching. Bridges traditional trade finance with supply chain finance solutions." },
        { id: 10, code: "Incoterms 2020", title: "International Commercial Terms for Trade Transactions", description: "ICC's globally recognized trade terms defining buyer and seller responsibilities. Specifies who pays for transport, insurance, and customs clearance. Determines the point of risk transfer from seller to buyer. Essential for drafting international sales contracts and documentary credits." },
        { id: 11, code: "URF 800", title: "ICC Uniform Rules for Forfaiting", description: "Standardized rules for forfaiting transactions in international trade finance. Defines rights and obligations of forfaiters, sellers, and guarantors. Covers both primary and secondary market forfaiting transactions. Promotes consistency and reduces legal uncertainty in forfaiting deals." },
        { id: 12, code: "SWIFT MT Standards", title: "Message Types for Trade Finance (MT 700, MT 760, MT 799, etc.)", description: "Standardized message formats for trade finance communications between banks. MT 700 series covers documentary credits, MT 760 for guarantees. Enables secure, structured data exchange across the global banking network. Foundation for interoperability in international trade finance operations." },
        { id: 13, code: "SWIFT gpi", title: "Global Payments Innovation Standards", description: "Enhanced standards for faster, transparent cross-border payments. Provides end-to-end tracking of international payment transactions. Ensures same-day use of funds with transparent fee structures. Increasingly integrated with trade finance for improved payment visibility." },
        { id: 14, code: "ISO 20022", title: "Universal Financial Industry Message Scheme", description: "Global standard for electronic data interchange in financial services. Provides rich, structured data for trade finance messages. Enables straight-through processing and improved analytics. Foundation for next-generation trade finance digitalization initiatives." },
        { id: 15, code: "DOCDEX", title: "Documentary Credit Dispute Resolution Expertise", description: "ICC's expert dispute resolution service for trade finance conflicts. Provides fast, cost-effective alternative to litigation or arbitration. Panel of trade finance experts renders binding or advisory decisions. Covers disputes under UCP, URDG, URC, and other ICC rules." },
        { id: 16, code: "ICC Model Forms", title: "Standard Forms for Documentary Credits and Guarantees", description: "Pre-approved templates for common trade finance instruments. Ensures compliance with ICC rules and industry best practices. Reduces drafting errors and speeds up transaction processing. Available for LCs, guarantees, collections, and other instruments." },
        { id: 17, code: "Basel III/IV", title: "Capital Requirements for Trade Finance Exposures", description: "International banking regulations affecting trade finance capital treatment. Defines risk weights and capital requirements for trade exposures. Impacts pricing and availability of trade finance products. Critical for banks' trade finance strategy and product development." }
      ]
    },
    {
      id: "insurance",
      name: "Insurance Standards",
      description: "Marine cargo insurance and export credit insurance standards",
      standards: [
        { id: 1, code: "Institute Cargo Clauses (A) CL382", title: "All Risks Marine Cargo Insurance", description: "The broadest form of marine cargo insurance coverage available. Covers all risks of physical loss or damage except specific exclusions. Standard requirement for CIF and CIP shipments under documentary credits. Most commonly requested insurance clause in international trade transactions." },
        { id: 2, code: "Institute Cargo Clauses (B) CL383", title: "Named Perils Marine Cargo Insurance", description: "Intermediate level marine cargo insurance with specified perils coverage. Covers fire, explosion, stranding, sinking, collision, and similar events. More limited than Clause A but broader than Clause C coverage. Suitable for lower-risk cargo or cost-sensitive shipments." },
        { id: 3, code: "Institute Cargo Clauses (C) CL384", title: "Minimum Cover Marine Cargo Insurance", description: "Basic marine cargo insurance covering major casualties only. Includes fire, explosion, vessel stranding, sinking, and collision. Does not cover theft, pilferage, or weather damage. Lowest cost option for robust cargo with minimal theft risk." },
        { id: 4, code: "Institute Cargo Clauses (Air)", title: "Air Cargo Insurance Standards", description: "Specialized insurance clauses for air freight shipments. Adapted from marine clauses for aviation-specific risks. Covers loss or damage during air transport and related handling. Essential for high-value or time-sensitive air cargo shipments." },
        { id: 5, code: "Institute War Clauses (Cargo)", title: "War Risk Insurance for Cargo", description: "Additional coverage for war-related risks not included in standard clauses. Covers loss or damage from war, civil war, and hostile acts. Typically purchased separately as an add-on to cargo insurance. Essential for shipments to or through conflict zones." },
        { id: 6, code: "Institute Strikes Clauses (Cargo)", title: "Strikes Risk Insurance", description: "Coverage for loss or damage caused by strikes and civil disturbances. Includes riots, civil commotions, and labor disputes. Usually purchased alongside war clauses for comprehensive coverage. Important for shipments through politically unstable regions." },
        { id: 7, code: "Institute Classification Clause", title: "Vessel Classification Requirements", description: "Standards for vessel classification in marine cargo insurance. Specifies acceptable vessel age, flag, and classification society. Affects insurance coverage validity and premium rates. Critical for ensuring cargo insurance remains effective during transit." },
        { id: 8, code: "Lloyd's Marine Insurance Act 1906", title: "UK Marine Insurance Legal Framework", description: "Foundational legislation governing marine insurance contracts. Codifies principles of utmost good faith, insurable interest, and indemnity. Basis for marine insurance law in many Commonwealth countries. Essential reference for understanding marine insurance obligations." },
        { id: 9, code: "York-Antwerp Rules 2016", title: "General Average Rules", description: "International rules for apportioning general average losses in shipping. Defines how extraordinary sacrifices are shared among cargo interests. Updated in 2016 with modern provisions for container shipping. Critical for understanding liability in maritime emergencies." },
        { id: 10, code: "Berne Union Short-Term", title: "Export Credit Insurance Standards", description: "Standards for short-term export credit insurance up to 2 years. Covers commercial and political risks in export transactions. Developed by the global association of export credit agencies. Essential framework for trade credit insurance products." },
        { id: 11, code: "Berne Union MLT", title: "Medium/Long-Term Export Credit Standards", description: "Guidelines for export credit insurance exceeding 2 years tenor. Covers large capital goods and project finance transactions. Includes standards for buyer credit and supplier credit structures. Foundation for government-backed export finance programs." }
      ]
    },
    {
      id: "bol",
      name: "Bill of Lading Conventions",
      description: "International conventions governing bills of lading and maritime transport",
      standards: [
        { id: 1, code: "Hague Rules (1924)", title: "International Convention for the Unification of Certain Rules of Law Relating to Bills of Lading", description: "The original international convention standardizing carrier liability for cargo. Establishes minimum carrier responsibilities and liability limits. Adopted by most major trading nations in the early 20th century. Foundation for modern maritime cargo liability regimes worldwide." },
        { id: 2, code: "Hague-Visby Rules (1968)", title: "Protocol to Amend the Hague Rules - enhanced carrier liability limits", description: "Updated version of Hague Rules with increased liability limits. Introduces SDR-based limitation of carrier liability. Extends coverage to include deck cargo and live animals. Most widely adopted maritime cargo liability convention today." },
        { id: 3, code: "Hamburg Rules (1978)", title: "UN Convention on the Carriage of Goods by Sea - more shipper-friendly", description: "UNCITRAL convention providing greater protection for cargo interests. Extends carrier liability period and reduces defenses available. Adopted primarily by developing countries and cargo-owning nations. Represents a shift toward shipper-friendly liability allocation." },
        { id: 4, code: "Rotterdam Rules (2008)", title: "UN Convention on Contracts for International Carriage of Goods Wholly or Partly by Sea", description: "Most comprehensive maritime transport convention to date. Covers door-to-door multimodal transport including sea leg. Addresses electronic documentation and modern shipping practices. Not yet in force but influences national legislation development." },
        { id: 5, code: "UCP 600 (Articles 19-25)", title: "Rules for presentation of transport documents including Bills of Lading", description: "Specific UCP provisions governing transport document requirements. Defines acceptable bill of lading formats and content. Covers multimodal, charter party, and other transport documents. Essential reference for documentary credit document examination." },
        { id: 6, code: "ISBP 821 (Paragraphs D1-D28)", title: "Detailed guidance on examining Bills of Lading under UCP 600", description: "Comprehensive guidance on bill of lading examination practices. Addresses common discrepancies and acceptable variations. Provides practical examples for document checkers. Regularly updated to reflect evolving trade practices." },
        { id: 7, code: "BIMCO Standard Forms", title: "Baltic and International Maritime Council standard B/L forms", description: "Industry-standard bill of lading templates for various trade routes. Developed by the leading international shipping association. Includes CONLINEBILL, CONGENBILL, and specialized forms. Widely accepted by banks and traders globally." },
        { id: 8, code: "FIATA Bill of Lading (FBL)", title: "Multimodal transport document issued by freight forwarders", description: "Negotiable multimodal transport document issued by FIATA forwarders. Acceptable under documentary credits per UCP 600 Article 19. Provides door-to-door coverage across multiple transport modes. Widely used for containerized and multimodal shipments." },
        { id: 9, code: "COGSA (US)", title: "Carriage of Goods by Sea Act - US implementation of Hague Rules", description: "United States legislation implementing Hague Rules principles. Governs carrier liability for cargo shipped to/from US ports. Includes specific provisions for package limitation and time bars. Essential for trade involving United States ports." },
        { id: 10, code: "CMI Rules for Electronic Bills of Lading", title: "Comité Maritime International rules for electronic B/Ls", description: "Early framework for electronic bill of lading transactions. Developed by the international maritime law organization. Provides contractual basis for paperless B/L transfers. Foundation for modern electronic B/L platforms." },
        { id: 11, code: "Bolero Rulebook", title: "Rules governing electronic Bills of Lading on Bolero platform", description: "Comprehensive legal framework for Bolero electronic B/Ls. Creates binding obligations among platform participants. Addresses title transfer, endorsement, and authentication. Pioneer in electronic trade document management." },
        { id: 12, code: "essDOCS", title: "Electronic Shipping Solutions documentation standards", description: "Platform standards for electronic shipping documentation. Enables paperless bills of lading and other trade documents. Integrates with major shipping lines and banks globally. Supports both negotiable and non-negotiable electronic documents." },
        { id: 13, code: "DCSA Standards", title: "Digital Container Shipping Association electronic B/L standards", description: "Industry standards for electronic bills of lading in container shipping. Developed by major container shipping lines collectively. Promotes interoperability across different eBL platforms. Accelerating adoption of paperless container trade." },
        { id: 14, code: "UNCITRAL MLETR", title: "Model Law on Electronic Transferable Records", description: "UN model law enabling legal recognition of electronic trade documents. Provides framework for functional equivalence with paper documents. Adopted by Singapore, UK, and other jurisdictions. Critical enabler for global digital trade adoption." },
        { id: 15, code: "ISO 22745", title: "Open Technical Dictionaries for trade documentation", description: "International standard for product identification in trade. Provides standardized terminology and data structures. Enables interoperability between different trade systems. Foundation for automated document processing." },
        { id: 16, code: "UN/CEFACT", title: "United Nations standards for trade facilitation and electronic business", description: "UN body developing global trade facilitation standards. Produces recommendations, standards, and technical specifications. Covers electronic data interchange and trade procedures. Essential reference for trade digitalization initiatives." }
      ]
    },
    {
      id: "transport",
      name: "Transport Document Standards",
      description: "Air, road, rail, and multimodal transport document standards",
      standards: [
        { id: 1, code: "IATA Resolution 600", title: "Air Waybill Standards", description: "International Air Transport Association standards for air waybills. Defines format, content, and handling of air cargo documents. Governs carrier liability and shipper responsibilities. Essential for air freight documentation worldwide." },
        { id: 2, code: "IATA e-AWB Standards", title: "Electronic Air Waybill Standards", description: "Standards enabling paperless air cargo documentation. Eliminates need for physical air waybill documents. Improves efficiency and reduces errors in air freight. Increasingly mandated by airlines and customs authorities." },
        { id: 3, code: "FIATA FBL", title: "Negotiable Multimodal Transport Bill of Lading", description: "FIATA's negotiable document for multimodal transport. Functions as document of title for cargo across modes. Acceptable under documentary credits per UCP 600. Widely used by freight forwarders globally." },
        { id: 4, code: "FIATA FWB", title: "Non-Negotiable Multimodal Transport Waybill", description: "FIATA's non-negotiable multimodal transport document. Serves as receipt and evidence of transport contract. Suitable when negotiability is not required. Commonly used for regular shipments between trusted parties." },
        { id: 5, code: "FIATA FCR", title: "Forwarders Certificate of Receipt", description: "Document confirming forwarder has received goods for dispatch. Not a transport document but evidence of receipt. Used in trade finance as proof of goods handover. Acceptable under certain documentary credit conditions." },
        { id: 6, code: "FIATA FCT", title: "Forwarders Certificate of Transport", description: "Certificate confirming goods have been dispatched as instructed. Provides evidence of transport arrangement by forwarder. Used when full transport document is not required. Suitable for certain trade finance arrangements." },
        { id: 7, code: "CMR Convention (1956)", title: "Convention on Contract for International Carriage of Goods by Road", description: "International convention governing road freight transport. Defines carrier liability and documentation requirements. Applies to cross-border road transport in Europe and beyond. Essential for trucking operations in international trade." },
        { id: 8, code: "CIM Convention", title: "International Rail Transport Convention", description: "Rules governing international rail freight transport. Part of COTIF convention system for rail transport. Defines carrier liability and consignment note requirements. Essential for rail freight across Europe and Asia." },
        { id: 9, code: "COTIF Convention", title: "Convention concerning International Carriage by Rail", description: "Comprehensive framework for international rail transport. Covers passenger and freight transport by rail. Includes CIM rules for goods and CIV for passengers. Foundation for rail transport across 50+ countries." },
        { id: 10, code: "Montreal Convention (1999)", title: "Air Carriage Liability Convention", description: "Modern convention governing air carrier liability for cargo. Updates and replaces the Warsaw Convention system. Provides higher liability limits and simplified regime. Ratified by most major aviation nations." },
        { id: 11, code: "Warsaw Convention (1929)", title: "Original Air Carriage Convention", description: "Original international convention for air carrier liability. Established framework for air transport documentation. Largely superseded by Montreal Convention 1999. Still relevant in some jurisdictions and historical context." }
      ]
    },
    {
      id: "factoring",
      name: "Factoring Standards",
      description: "International factoring rules and conventions",
      standards: [
        { id: 1, code: "GRIF", title: "General Rules for International Factoring (FCI)", description: "FCI's comprehensive rules governing international factoring transactions. Defines relationships between export and import factors. Covers credit protection, collection, and dispute resolution. Essential framework for two-factor international factoring." },
        { id: 2, code: "UNIDROIT Convention", title: "International legal framework for factoring transactions", description: "International convention providing legal framework for factoring. Addresses assignment of receivables and debtor notification. Harmonizes factoring law across different jurisdictions. Foundation for national factoring legislation." },
        { id: 3, code: "FCI Rules of Arbitration", title: "Dispute resolution rules for international factoring", description: "Specialized arbitration rules for factoring disputes. Provides efficient resolution of inter-factor conflicts. Administered by FCI with expert arbitrators. Cost-effective alternative to court litigation." },
        { id: 4, code: "FCI Code of International Factoring Customs", title: "Best practices and customs for international factoring", description: "Industry best practices for international factoring operations. Covers operational procedures and ethical standards. Promotes consistency across FCI member factors. Essential reference for factoring professionals." }
      ]
    },
    {
      id: "forfaiting",
      name: "Forfaiting Standards",
      description: "ICC and ITFA rules governing forfaiting transactions",
      standards: [
        { id: 1, code: "URF 800", title: "ICC Uniform Rules for Forfaiting", description: "ICC's comprehensive rules for forfaiting transactions. Defines rights and obligations of all parties. Covers both primary and secondary market transactions. Essential framework for forfaiting globally." },
        { id: 2, code: "ICC Publication 800", title: "Detailed guidance on forfaiting practices", description: "Comprehensive guidance accompanying URF 800 rules. Provides practical examples and interpretations. Addresses common issues in forfaiting transactions. Essential reference for forfaiting practitioners." },
        { id: 3, code: "ITFA Guidelines", title: "International Trade and Forfaiting Association best practices", description: "Industry guidelines from the leading forfaiting association. Covers market practices and documentation standards. Promotes consistency in forfaiting operations. Regularly updated to reflect market developments." },
        { id: 4, code: "ITFA Standard Documentation", title: "Model agreements and documentation for forfaiting", description: "Standardized templates for forfaiting transactions. Includes master agreements and transaction confirmations. Reduces negotiation time and legal costs. Widely adopted by forfaiting market participants." }
      ]
    },
    {
      id: "scf",
      name: "Supply Chain Finance Standards",
      description: "Standards for supply chain and receivables finance",
      standards: [
        { id: 1, code: "ICC Standard Definitions for SCF", title: "Standardized terminology for SCF products", description: "ICC's authoritative definitions for supply chain finance products. Covers payables finance, receivables finance, and inventory finance. Promotes common understanding across the industry. Essential reference for SCF product development." },
        { id: 2, code: "BAFT Guidelines", title: "Bankers Association for Finance and Trade best practices", description: "Industry guidelines for supply chain finance operations. Covers risk management and operational procedures. Developed by leading trade finance banks. Promotes best practices in SCF implementation." },
        { id: 3, code: "GSCFF Standards", title: "Global Supply Chain Finance Forum industry framework", description: "Collaborative framework from major trade finance associations. Harmonizes SCF terminology and practices globally. Addresses regulatory and accounting considerations. Foundation for SCF market development." },
        { id: 4, code: "UNCITRAL Model Law on Secured Transactions", title: "Legal framework for receivables financing", description: "UN model law for secured transactions including receivables. Provides framework for security interests in movables. Enables efficient receivables financing structures. Adopted by numerous jurisdictions worldwide." },
        { id: 5, code: "UNCITRAL Convention on Assignment of Receivables", title: "International rules for receivables assignment", description: "International convention on receivables assignment. Addresses cross-border assignment and priority rules. Promotes legal certainty in receivables transactions. Foundation for international receivables finance." },
        { id: 6, code: "LMA Documentation", title: "Loan Market Association standard documentation", description: "Standardized documentation for receivables finance facilities. Developed by the Loan Market Association. Covers securitization and asset-based lending. Widely used in European receivables finance market." },
        { id: 7, code: "Packing Credit Guidelines", title: "Industry standards for packing credit facilities", description: "Guidelines for pre-shipment finance against export orders. Covers documentation and disbursement procedures. Addresses risk management in packing credit. Essential for export working capital finance." }
      ]
    },
    {
      id: "lc-types",
      name: "Letter of Credit Types",
      description: "Different types of documentary credits and their characteristics",
      standards: [
        { id: 1, code: "Irrevocable LC", title: "Cannot be amended without all parties' consent", description: "Standard form of documentary credit under UCP 600. Cannot be cancelled or amended without beneficiary consent. Provides strong payment assurance to exporters. Default type unless otherwise specified in the credit." },
        { id: 2, code: "Confirmed LC", title: "Additional bank confirmation", description: "LC with payment undertaking from a second confirming bank. Provides additional security against issuing bank risk. Commonly used when issuing bank is in higher-risk country. Beneficiary has recourse to both issuing and confirming banks." },
        { id: 3, code: "Transferable LC", title: "Can be transferred to second beneficiary", description: "LC that allows transfer to one or more second beneficiaries. Used by middlemen and trading companies. Must be specifically designated as transferable. Enables back-to-back trading arrangements." },
        { id: 4, code: "Back-to-Back LC", title: "Secondary LC based on master LC", description: "Separate LC issued based on a master LC as security. Used when transferable LC is not available. Involves two independent LC transactions. Common in intermediary trade arrangements." },
        { id: 5, code: "Red Clause LC", title: "Advance payment before shipment", description: "LC allowing advance payment to beneficiary before shipment. Named for red ink used to highlight advance clause. Provides pre-shipment finance to exporters. Applicant bears risk of advance not being recovered." },
        { id: 6, code: "Green Clause LC", title: "Advance for pre-shipment and storage", description: "Extended red clause LC covering storage costs. Allows advances for production and warehousing. Used for commodities requiring storage before shipment. Provides comprehensive pre-shipment financing." },
        { id: 7, code: "Revolving LC", title: "Automatically reinstates after use", description: "LC that automatically reinstates after each drawing. Useful for regular shipments between same parties. Can revolve by time period or by amount. Reduces administrative burden of multiple LC issuances." },
        { id: 8, code: "Standby LC (SBLC)", title: "Guarantee-type LC", description: "LC functioning as a guarantee rather than payment mechanism. Drawn only if underlying obligation is not performed. Subject to ISP98 or UCP 600 rules. Widely used in US and increasingly globally." },
        { id: 9, code: "Deferred Payment LC", title: "Payment at future date", description: "LC providing for payment at a specified future date. No draft or acceptance required from beneficiary. Bank undertakes to pay at maturity without acceptance. Common for usance transactions without bills of exchange." },
        { id: 10, code: "Acceptance LC", title: "Payment via accepted draft", description: "LC requiring acceptance of time draft by nominated bank. Creates accepted bill of exchange as payment instrument. Draft can be discounted before maturity. Provides negotiable instrument for trade finance." },
        { id: 11, code: "Negotiation LC", title: "Any bank can negotiate", description: "LC allowing negotiation by any bank willing to do so. Provides flexibility in obtaining payment. Negotiating bank purchases documents with recourse. Beneficiary can approach multiple banks for best terms." },
        { id: 12, code: "Sight LC", title: "Payment on presentation", description: "LC providing immediate payment upon compliant presentation. Most common type for spot transactions. Bank pays within standard examination period. Provides fastest payment to beneficiaries." },
        { id: 13, code: "Usance LC", title: "Payment after specified period", description: "LC with deferred payment terms (30, 60, 90 days, etc.). Provides credit period to buyer/applicant. Payment due at specified tenor after sight or shipment. Common for buyer financing arrangements." }
      ]
    },
    {
      id: "guarantee-types",
      name: "Guarantee Types",
      description: "Different types of bank guarantees and their purposes",
      standards: [
        { id: 1, code: "Bid Bond/Tender Guarantee", title: "Secures bid commitment", description: "Guarantee supporting tender or bid submission. Ensures bidder will sign contract if awarded. Typically 2-5% of bid value. Released upon contract signing or bid rejection." },
        { id: 2, code: "Performance Guarantee", title: "Secures contract performance", description: "Guarantee ensuring contractor fulfills obligations. Typically 10-15% of contract value. Covers completion, quality, and timeline commitments. Most common type of demand guarantee." },
        { id: 3, code: "Advance Payment Guarantee", title: "Secures advance payment refund", description: "Guarantee protecting buyer's advance payment. Ensures refund if contractor fails to perform. Amount reduces as work progresses. Essential for construction and project contracts." },
        { id: 4, code: "Retention Money Guarantee", title: "Secures retention release", description: "Guarantee allowing early release of retention money. Typically 5-10% of contract value. Covers defects liability period obligations. Improves contractor's cash flow position." },
        { id: 5, code: "Payment Guarantee", title: "Secures payment obligation", description: "Guarantee ensuring buyer will pay for goods/services. Protects seller against buyer default. Common in open account trading arrangements. Alternative to documentary credit for trusted buyers." },
        { id: 6, code: "Warranty Guarantee", title: "Secures warranty period obligations", description: "Guarantee covering warranty period after project completion. Ensures contractor addresses defects during warranty. Typically 2-5% of contract value. Duration matches warranty period." },
        { id: 7, code: "Customs Guarantee", title: "Secures customs duties", description: "Guarantee securing potential customs duty liability. Required for temporary imports and transit goods. Enables release of goods pending duty determination. Common in bonded warehouse operations." },
        { id: 8, code: "Shipping Guarantee", title: "Secures release of goods without B/L", description: "Guarantee enabling cargo release without original B/L. Used when documents arrive after vessel. Indemnifies carrier against misdelivery claims. Time-limited until original B/L surrendered." },
        { id: 9, code: "Counter-Guarantee", title: "Guarantee to support another guarantee", description: "Guarantee issued to support local guarantee issuance. Enables foreign bank to issue guarantee locally. Common in cross-border construction projects. Creates chain of guarantee obligations." }
      ]
    },
    {
      id: "customs",
      name: "Customs & Trade Facilitation",
      description: "WTO and WCO standards for customs and trade facilitation",
      standards: [
        { id: 1, code: "WTO Trade Facilitation Agreement (TFA)", title: "WTO Agreement on Trade Facilitation", description: "Landmark WTO agreement to expedite customs procedures. Requires publication of trade regulations and advance rulings. Promotes electronic processing and risk management. Entered into force 2017 with significant global impact." },
        { id: 2, code: "WCO Revised Kyoto Convention", title: "International Convention on Simplification and Harmonization of Customs Procedures", description: "WCO's blueprint for modern customs procedures. Covers clearance, duties, and customs controls. Promotes use of IT and risk management. Foundation for customs modernization worldwide." },
        { id: 3, code: "WCO SAFE Framework", title: "Framework of Standards to Secure and Facilitate Global Trade", description: "WCO framework balancing security and facilitation. Introduces Authorized Economic Operator concept. Promotes customs-to-customs and customs-to-business cooperation. Adopted by over 170 WCO member countries." },
        { id: 4, code: "WCO Harmonized System (HS)", title: "Harmonized Commodity Description and Coding System", description: "Universal product classification system for trade. Six-digit codes for all traded goods. Basis for customs tariffs and trade statistics. Used by over 200 countries and territories." },
        { id: 5, code: "WCO Data Model", title: "Standardized Data Elements for Customs", description: "Standardized data elements for customs declarations. Enables electronic data interchange with customs. Promotes single window implementation. Foundation for customs automation systems." },
        { id: 6, code: "AEO (Authorized Economic Operator)", title: "Trusted Trader Programs", description: "Customs partnership programs for compliant traders. Provides expedited clearance and reduced inspections. Requires demonstrated compliance and security standards. Mutual recognition agreements between countries." },
        { id: 7, code: "Single Window Standards", title: "Trade Single Window Implementation Standards", description: "Standards for national trade single window systems. Enables single submission of trade data. Reduces duplication and speeds clearance. Recommended by WCO, WTO, and UN/CEFACT." },
        { id: 8, code: "WCO Transit Guidelines", title: "Customs Transit Procedures", description: "Guidelines for goods in customs transit. Covers guarantees, seals, and transit documentation. Promotes regional transit arrangements. Essential for landlocked country trade." }
      ]
    },
    {
      id: "certificates",
      name: "Certificate & Document Standards",
      description: "Standards for trade certificates and documentation",
      standards: [
        { id: 1, code: "ICC Publication 809e", title: "International Certificate of Origin Guidelines", description: "ICC guidelines for certificate of origin issuance. Covers non-preferential origin certification. Defines chamber of commerce responsibilities. Essential reference for origin documentation." },
        { id: 2, code: "EUR.1 Certificate", title: "European Preference Certificate of Origin", description: "Certificate proving EU preferential origin status. Required for tariff preferences under EU agreements. Issued by customs or authorized exporters. Essential for EU free trade agreement benefits." },
        { id: 3, code: "Form A (GSP)", title: "Generalized System of Preferences Certificate", description: "Origin certificate for GSP tariff preferences. Enables developing country exports at reduced duties. Issued by designated government authorities. Critical for accessing preferential market access." },
        { id: 4, code: "ATA Carnet", title: "Temporary Admission Document", description: "International customs document for temporary imports. Covers samples, professional equipment, and exhibitions. Eliminates need for customs deposits. Valid in over 75 countries worldwide." },
        { id: 5, code: "TIR Carnet", title: "International Road Transport Document", description: "Customs transit document for road transport. Enables sealed transport across multiple borders. Reduces customs formalities and delays. Essential for European and Asian road freight." },
        { id: 6, code: "ISPM 15", title: "Wood Packaging Material Standards", description: "International standard for wood packaging treatment. Requires heat treatment or fumigation marking. Prevents spread of pests through trade. Mandatory for wood packaging in most countries." },
        { id: 7, code: "Phytosanitary Certificate Standards", title: "Plant Health Certificate Requirements", description: "International standards for plant health certification. Required for agricultural and plant product exports. Issued by national plant protection organizations. Essential for food and agricultural trade." },
        { id: 8, code: "Sanitary Certificate Standards", title: "Food Safety Certificate Requirements", description: "Standards for food safety and animal health certificates. Required for food and animal product exports. Issued by veterinary or health authorities. Critical for food trade compliance." },
        { id: 9, code: "Certificate of Conformity Standards", title: "Product Conformity Documentation", description: "Standards for product conformity certification. Confirms products meet destination country standards. Required by many importing countries. Issued by accredited inspection bodies." },
        { id: 10, code: "Pre-Shipment Inspection Standards", title: "PSI Documentation Requirements", description: "Standards for pre-shipment inspection programs. Verifies quality, quantity, and price before shipment. Required by some importing countries. Issued by authorized inspection companies." }
      ]
    },
    {
      id: "aml",
      name: "AML/CFT Standards",
      description: "Anti-money laundering and counter-terrorism financing standards",
      standards: [
        { id: 1, code: "FATF 40 Recommendations", title: "Financial Action Task Force core AML/CFT standards", description: "Global standards for combating money laundering and terrorist financing. Covers customer due diligence, reporting, and supervision. Basis for national AML legislation worldwide. Regularly updated to address emerging threats." },
        { id: 2, code: "FATF TBML Guidance", title: "Specific guidance on detecting TBML red flags", description: "Specialized guidance on trade-based money laundering risks. Identifies red flags in trade finance transactions. Covers over/under invoicing and phantom shipments. Essential for trade finance compliance programs." },
        { id: 3, code: "Wolfsberg Principles", title: "Trade Finance AML Compliance Principles", description: "Industry principles from major global banks. Covers AML compliance in trade finance operations. Addresses due diligence and transaction monitoring. Widely adopted benchmark for trade finance compliance." },
        { id: 4, code: "Wolfsberg Trade Finance Principles (2019)", title: "Guidance for Managing Financial Crime Risks in Trade Finance", description: "Updated guidance on trade finance financial crime risks. Covers documentary credits, guarantees, and open account. Addresses dual-use goods and sanctions screening. Essential reference for trade finance compliance." },
        { id: 5, code: "Wolfsberg ABC Guidance", title: "Anti-Bribery and Corruption guidance", description: "Guidance on preventing bribery and corruption in banking. Covers third-party due diligence and red flags. Addresses trade finance corruption risks. Complements AML compliance programs." },
        { id: 6, code: "Wolfsberg Payment Transparency Standards", title: "Standards for payment message transparency", description: "Standards for complete payment message information. Ensures originator and beneficiary details are transmitted. Supports sanctions screening and AML monitoring. Foundation for payment transparency initiatives." },
        { id: 7, code: "6th EU AML Directive (6AMLD)", title: "European Union AML requirements", description: "Latest EU anti-money laundering directive. Harmonizes money laundering criminal offenses. Extends liability to legal persons. Strengthens penalties and cooperation mechanisms." },
        { id: 8, code: "US Bank Secrecy Act (BSA)", title: "US AML legislation", description: "Foundation of US anti-money laundering framework. Requires suspicious activity reporting and record keeping. Covers all US financial institutions. Enforced by FinCEN and banking regulators." },
        { id: 9, code: "USA PATRIOT Act", title: "US anti-terrorism and AML requirements", description: "Post-9/11 legislation strengthening AML requirements. Enhanced due diligence for correspondent banking. Prohibits shell bank relationships. Significant impact on international banking." },
        { id: 10, code: "UK Money Laundering Regulations", title: "UK AML framework", description: "UK implementation of EU AML directives. Covers customer due diligence and reporting. Applies to all UK financial services firms. Enforced by FCA and other regulators." }
      ]
    },
    {
      id: "sanctions",
      name: "Sanctions Compliance",
      description: "International sanctions regimes and compliance standards",
      standards: [
        { id: 1, code: "OFAC Regulations", title: "US Office of Foreign Assets Control sanctions", description: "US economic and trade sanctions programs. Covers country sanctions and targeted designations. Extraterritorial application to USD transactions. Critical for all international trade and finance." },
        { id: 2, code: "EU Sanctions Regulations", title: "European Union restrictive measures", description: "EU sanctions against countries, entities, and individuals. Directly applicable in all EU member states. Covers asset freezes and trade restrictions. Essential for EU trade compliance." },
        { id: 3, code: "UN Security Council Sanctions", title: "United Nations sanctions regimes", description: "Mandatory sanctions imposed by UN Security Council. Binding on all UN member states. Covers arms embargoes, asset freezes, and travel bans. Foundation for national sanctions implementation." },
        { id: 4, code: "UK OFSI Sanctions", title: "UK Office of Financial Sanctions Implementation", description: "UK financial sanctions administration and enforcement. Implements UN and autonomous UK sanctions. Post-Brexit independent sanctions regime. Critical for UK trade and finance compliance." }
      ]
    },
    {
      id: "export-compliance",
      name: "Trade/Export Compliance",
      description: "Export control regulations and dual-use goods standards",
      standards: [
        { id: 1, code: "Export Administration Regulations (EAR)", title: "US export control regulations", description: "US controls on dual-use goods and technology exports. Administered by Bureau of Industry and Security. Covers Commerce Control List items. Extraterritorial application to US-origin items." },
        { id: 2, code: "ITAR", title: "US defense trade controls", description: "US controls on defense articles and services. Administered by State Department DDTC. Covers US Munitions List items. Strict controls on foreign persons access." },
        { id: 3, code: "EU Dual-Use Regulation", title: "EU controls on dual-use items", description: "EU framework for dual-use export controls. Harmonized controls across EU member states. Covers items with civilian and military applications. Recently updated with cyber-surveillance controls." },
        { id: 4, code: "Wassenaar Arrangement", title: "Multilateral export control regime", description: "Multilateral agreement on conventional arms and dual-use goods. 42 participating states coordinate controls. Covers munitions and dual-use lists. Foundation for national export control lists." },
        { id: 5, code: "Nuclear Suppliers Group (NSG) Guidelines", title: "Nuclear-related export controls", description: "Multilateral controls on nuclear-related exports. Covers nuclear material, equipment, and technology. 48 participating governments. Essential for nuclear non-proliferation." },
        { id: 6, code: "Australia Group Guidelines", title: "Chemical/biological weapons export controls", description: "Multilateral controls on chemical and biological items. Prevents proliferation of CBW capabilities. 43 participating countries. Covers precursors and production equipment." },
        { id: 7, code: "MTCR", title: "Missile technology export controls", description: "Multilateral controls on missile technology. Prevents proliferation of delivery systems for WMD. 35 partner countries. Covers rockets, UAVs, and related technology." }
      ]
    },
    {
      id: "kyc",
      name: "KYC/Due Diligence Standards",
      description: "Know Your Customer and due diligence requirements",
      standards: [
        { id: 1, code: "Wolfsberg KYC Standards", title: "Know Your Customer principles", description: "Industry standards for customer due diligence. Covers customer identification and verification. Addresses beneficial ownership requirements. Widely adopted by global banks." },
        { id: 2, code: "JMLSG Guidance (UK)", title: "Joint Money Laundering Steering Group guidance", description: "UK industry guidance on AML compliance. Covers customer due diligence procedures. Sector-specific guidance for financial services. Approved by HM Treasury." },
        { id: 3, code: "BAFT KYC Guidelines", title: "Bankers Association for Finance and Trade KYC standards", description: "Trade finance specific KYC guidelines. Addresses due diligence in trade transactions. Covers documentary credit and guarantee KYC. Developed by leading trade finance banks." },
        { id: 4, code: "ICC Guidance on Documentary Credit Fraud", title: "Fraud prevention in documentary credits", description: "ICC guidance on preventing LC fraud. Identifies common fraud schemes and red flags. Covers document fraud and cargo fraud. Essential for trade finance risk management." },
        { id: 5, code: "ICC Commercial Crime Services (CCS)", title: "Trade finance fraud prevention resources", description: "ICC's commercial crime prevention unit. Provides fraud alerts and intelligence. Operates International Maritime Bureau. Essential resource for trade fraud prevention." },
        { id: 6, code: "IMB (International Maritime Bureau)", title: "Maritime fraud and piracy reporting", description: "ICC unit combating maritime crime. Operates piracy reporting center. Provides vessel due diligence services. Essential for maritime trade security." },
        { id: 7, code: "FIU Guidelines", title: "Financial Intelligence Unit reporting requirements", description: "Guidelines for suspicious activity reporting. Covers report content and timing requirements. Varies by jurisdiction. Essential for AML compliance." },
        { id: 8, code: "Egmont Group Standards", title: "FIU information sharing standards", description: "Standards for FIU international cooperation. Enables cross-border intelligence sharing. 166 member FIUs worldwide. Foundation for international AML cooperation." }
      ]
    },
    {
      id: "digital-trade",
      name: "Digital Trade Standards",
      description: "Standards for digital trade and electronic documentation",
      standards: [
        { id: 1, code: "ICC Digital Standards Initiative (DSI)", title: "Global Digital Trade Standards Framework", description: "ICC's initiative to standardize digital trade. Develops interoperability standards for trade platforms. Promotes adoption of electronic trade documents. Foundation for global digital trade ecosystem." },
        { id: 2, code: "UK Electronic Trade Documents Act 2023", title: "UK Legal Framework for Digital Trade Documents", description: "UK legislation enabling electronic trade documents. Gives electronic documents same legal status as paper. Covers bills of lading, bills of exchange, and more. Landmark legislation for digital trade." },
        { id: 3, code: "Singapore ETDA", title: "Electronic Transactions (Amendment) Act", description: "Singapore legislation for electronic transferable records. Implements UNCITRAL MLETR model law. Enables electronic bills of lading. Pioneer in Asian digital trade legislation." },
        { id: 4, code: "ICC/SWIFT Guarantee API Standards", title: "API Standards for Guarantees and Standby LCs", description: "Technical standards for guarantee digitalization. Enables automated guarantee issuance and management. Developed jointly by ICC and SWIFT. Foundation for guarantee platform interoperability." },
        { id: 5, code: "DCSA eBL Standards", title: "Digital Container Shipping Association Electronic Bill of Lading", description: "Industry standards for electronic bills of lading. Developed by major container shipping lines. Promotes platform interoperability. Accelerating eBL adoption in container trade." },
        { id: 6, code: "TradeLens Standards", title: "Blockchain-based Trade Documentation Standards", description: "Blockchain platform standards for trade documentation. Originally developed by Maersk and IBM. Covers shipping and customs documentation. Pioneered blockchain in trade finance." },
        { id: 7, code: "we.trade Standards", title: "Blockchain Trade Finance Platform Standards", description: "European blockchain trade finance platform standards. Developed by consortium of European banks. Covers open account trade finance. Demonstrates blockchain potential in trade." },
        { id: 8, code: "Marco Polo Network Standards", title: "Trade Finance Network Standards", description: "Distributed ledger network for trade finance. Connects banks, corporates, and ERPs. Covers receivables and payables finance. Growing network of participants." },
        { id: 9, code: "Contour Network Standards", title: "Digital LC Network Standards", description: "Blockchain network for documentary credits. Digitizes end-to-end LC process. Connects banks and corporates globally. Leading digital LC platform." }
      ]
    },
    {
      id: "accounting",
      name: "Accounting & Regulatory Standards",
      description: "Financial reporting and regulatory capital standards",
      standards: [
        { id: 1, code: "IFRS 9", title: "Financial Instruments Accounting Standard", description: "International standard for financial instrument accounting. Covers classification, measurement, and impairment. Significant impact on trade finance provisioning. Replaced IAS 39 from 2018." },
        { id: 2, code: "IFRS 15", title: "Revenue from Contracts with Customers", description: "Standard for revenue recognition from customer contracts. Affects trade finance fee recognition. Five-step model for revenue recognition. Essential for trade finance accounting." },
        { id: 3, code: "IFRS 16", title: "Leases (relevant for equipment finance)", description: "Standard for lease accounting by lessees and lessors. Brings most leases on balance sheet. Impacts equipment and asset finance. Significant change from IAS 17." },
        { id: 4, code: "IAS 32", title: "Financial Instruments Presentation", description: "Standard for financial instrument presentation. Covers liability vs equity classification. Affects trade finance instrument presentation. Works with IFRS 9 and IFRS 7." },
        { id: 5, code: "Basel III", title: "Bank Capital Requirements Framework", description: "International framework for bank capital requirements. Covers credit, market, and operational risk. Significant impact on trade finance capital. Implemented globally since 2013." },
        { id: 6, code: "Basel IV", title: "Enhanced Capital Requirements", description: "Final Basel III reforms tightening capital requirements. Introduces output floor on internal models. Affects trade finance risk weights. Implementation from 2023-2028." },
        { id: 7, code: "CRR/CRD (EU)", title: "Capital Requirements Regulation/Directive", description: "EU implementation of Basel standards. Directly applicable regulation plus directive. Covers all EU credit institutions. Includes trade finance specific provisions." },
        { id: 8, code: "OCC Trade Finance Handbook", title: "US Comptroller's Trade Finance Guidelines", description: "US regulatory guidance on trade finance. Covers examination procedures and risk management. Essential for US bank trade finance operations. Updated periodically by OCC." }
      ]
    },
    {
      id: "esg",
      name: "Sustainability & ESG Standards",
      description: "Environmental, social, and governance standards for trade finance",
      standards: [
        { id: 1, code: "ICC Principles for Sustainable Trade Finance", title: "ICC Sustainability Framework", description: "ICC framework for sustainable trade finance. Defines criteria for sustainable trade transactions. Covers environmental and social considerations. Foundation for green trade finance products." },
        { id: 2, code: "ICC Principles for Social Trade Finance", title: "Social Impact Trade Finance Standards", description: "ICC standards for socially beneficial trade finance. Covers SME finance and inclusive trade. Addresses gender and development goals. Promotes trade finance for social impact." },
        { id: 3, code: "ICC Principles for Sustainability-Linked SCF", title: "Supply Chain Finance Sustainability Standards", description: "Standards linking SCF to sustainability performance. Covers KPI selection and verification. Enables sustainability-linked pricing. Growing adoption in supply chain finance." },
        { id: 4, code: "EU Taxonomy Regulation", title: "EU Sustainable Finance Classification", description: "EU classification system for sustainable activities. Defines environmentally sustainable economic activities. Affects trade finance product classification. Foundation for EU green finance framework." },
        { id: 5, code: "Green Loan Principles (LMA)", title: "Loan Market Association Green Loan Standards", description: "Principles for green loan transactions. Covers use of proceeds and reporting. Widely adopted for green trade finance. Developed by LMA, APLMA, and LSTA." },
        { id: 6, code: "Sustainability-Linked Loan Principles", title: "ESG-Linked Financing Standards", description: "Principles for sustainability-linked loans. Covers KPI selection and pricing mechanisms. Enables ESG-linked trade finance. Growing market for sustainability-linked facilities." },
        { id: 7, code: "Equator Principles", title: "Project Finance Environmental Standards", description: "Risk management framework for project finance. Covers environmental and social due diligence. Adopted by over 130 financial institutions. Applies to large trade-related projects." },
        { id: 8, code: "Poseidon Principles", title: "Shipping Finance Climate Standards", description: "Framework for climate-aligned ship finance. Measures portfolio climate alignment. Adopted by major shipping banks. Promotes decarbonization of shipping." }
      ]
    },
    {
      id: "dispute",
      name: "Dispute Resolution Standards",
      description: "Arbitration and dispute resolution frameworks",
      standards: [
        { id: 1, code: "ICC DOCDEX Rules", title: "Documentary Credit Dispute Resolution", description: "ICC's expert dispute resolution for trade finance. Fast, cost-effective alternative to arbitration. Panel of trade finance experts. Covers UCP, URDG, and URC disputes." },
        { id: 2, code: "ICC Arbitration Rules", title: "International Commercial Arbitration", description: "World's leading international arbitration rules. Administered by ICC International Court of Arbitration. Covers all commercial disputes including trade. Enforceable under New York Convention." },
        { id: 3, code: "ICC Mediation Rules", title: "Commercial Mediation Standards", description: "ICC rules for commercial mediation. Confidential, flexible dispute resolution. Can be combined with arbitration. Cost-effective for trade disputes." },
        { id: 4, code: "UNCITRAL Arbitration Rules", title: "UN Arbitration Framework", description: "Widely used ad hoc arbitration rules. Suitable for investor-state and commercial disputes. No administering institution required. Foundation for many institutional rules." },
        { id: 5, code: "LCIA Arbitration Rules", title: "London Court of International Arbitration", description: "Leading international arbitration institution. Efficient case management and cost control. Popular for English law disputes. Strong in trade and finance arbitration." },
        { id: 6, code: "SIAC Rules", title: "Singapore International Arbitration Centre", description: "Asia's leading arbitration institution. Efficient procedures and experienced arbitrators. Popular for Asian trade disputes. Growing international caseload." },
        { id: 7, code: "HKIAC Rules", title: "Hong Kong International Arbitration Centre", description: "Major Asian arbitration institution. Gateway for China-related disputes. Bilingual proceedings available. Strong trade and finance expertise." }
      ]
    },
    {
      id: "tech-api",
      name: "Technology & API Standards",
      description: "Technical standards for trade finance systems integration",
      standards: [
        { id: 1, code: "ISO 20022 (Trade Finance)", title: "Universal Financial Messaging Standard", description: "Global standard for financial messaging. Rich, structured data for trade finance. Enables straight-through processing. Foundation for trade finance digitalization." },
        { id: 2, code: "SWIFT MX Messages", title: "ISO 20022-based SWIFT Messages", description: "SWIFT's ISO 20022 message implementation. Replacing legacy MT messages over time. Richer data for trade finance transactions. Migration ongoing through 2025." },
        { id: 3, code: "FIX Protocol", title: "Financial Information Exchange Protocol", description: "Electronic trading communication protocol. Used for trade execution and reporting. Increasingly applied to trade finance. Enables automated trading workflows." },
        { id: 4, code: "SFTP Standards", title: "Secure File Transfer for Trade Documents", description: "Secure protocol for trade document exchange. Encrypted file transfer between parties. Common for bulk document transmission. Foundation for trade document automation." },
        { id: 5, code: "XML Standards for Trade", title: "Trade Document XML Schemas", description: "XML schemas for trade documentation. Enables structured document exchange. Covers invoices, orders, and shipping documents. Foundation for electronic trade documents." },
        { id: 6, code: "JSON Standards for Trade APIs", title: "API Data Format Standards", description: "JSON format standards for trade finance APIs. Lightweight data interchange format. Preferred for modern API development. Enables real-time trade finance integration." },
        { id: 7, code: "OAuth 2.0", title: "API Authentication Standards", description: "Industry standard for API authorization. Secure access to trade finance APIs. Enables third-party application access. Foundation for open banking in trade." },
        { id: 8, code: "OpenID Connect", title: "Identity Verification for Trade Platforms", description: "Identity layer on top of OAuth 2.0. Enables single sign-on for trade platforms. Secure user authentication. Foundation for trade platform identity management." }
      ]
    },
    {
      id: "icc-opinions",
      name: "ICC Collected Opinions",
      description: "ICC Banking Commission opinions and publications",
      standards: [
        { id: 1, code: "ICC Banking Commission Opinions (1980-1988)", title: "Early collected opinions on documentary credit practices", description: "Foundation opinions establishing documentary credit interpretation principles. Addresses fundamental questions under early UCP versions. Historical reference for understanding rule evolution. Essential for trade finance legal research." },
        { id: 2, code: "ICC Banking Commission Opinions (1989-1994)", title: "Opinions addressing UCP 400/500 interpretation issues", description: "Opinions during UCP 400 and early UCP 500 period. Addresses transition issues between rule versions. Covers emerging electronic documentation questions. Important historical reference." },
        { id: 3, code: "ICC Banking Commission Opinions (1995-2001)", title: "Continued guidance on documentary credit disputes", description: "Mature UCP 500 period opinions. Addresses complex documentary credit scenarios. Covers transport document and insurance issues. Foundation for ISBP development." },
        { id: 4, code: "ICC Banking Commission Opinions (2002-2007)", title: "Opinions bridging UCP 500 to UCP 600 transition", description: "Opinions during UCP 600 development period. Addresses issues that influenced UCP 600 drafting. Covers emerging practices and technologies. Important transition period reference." },
        { id: 5, code: "ICC Banking Commission Opinions (2009-2011)", title: "First opinions under UCP 600 regime", description: "Initial opinions interpreting UCP 600 provisions. Addresses new article interpretations. Covers ISBP 681 related questions. Foundation for UCP 600 understanding." },
        { id: 6, code: "ICC Banking Commission Opinions (2012-2016)", title: "Comprehensive UCP 600 interpretations", description: "Mature UCP 600 period opinions. Addresses complex scenarios and edge cases. Covers digital trade emerging issues. Comprehensive guidance for practitioners." },
        { id: 7, code: "ICC Banking Commission Opinions (2017-2019)", title: "Recent guidance on modern trade finance issues", description: "Contemporary opinions addressing current challenges. Covers sanctions, compliance, and technology issues. Addresses ISBP 745 interpretations. Essential current reference." },
        { id: 8, code: "ICC Banking Commission Opinions (2020-Present)", title: "Latest opinions including digital trade considerations", description: "Most recent Banking Commission guidance. Addresses COVID-19 impacts on trade finance. Covers digital trade document issues. Current authoritative reference." },
        { id: 9, code: "ICC Publication 680", title: "Collected Banking Commission Opinions 1995-2001", description: "Comprehensive collection of 1995-2001 opinions. Organized by topic and UCP article. Essential reference for documentary credit disputes. Available from ICC bookstore." },
        { id: 10, code: "ICC Publication 697", title: "Collected Banking Commission Opinions 2002-2007", description: "Collection covering UCP 500 to 600 transition. Includes opinions influencing UCP 600 development. Valuable historical and practical reference. Available from ICC bookstore." },
        { id: 11, code: "ICC Publication 726", title: "Collected Opinions 2009-2011", description: "First UCP 600 period opinions collection. Essential for understanding early UCP 600 interpretation. Covers initial implementation questions. Available from ICC bookstore." },
        { id: 12, code: "ICC Publication 732", title: "Collected Opinions 2012-2016 (Comprehensive volume)", description: "Comprehensive collection of mature UCP 600 opinions. Covers wide range of documentary credit issues. Includes guarantee and collection opinions. Major reference work for practitioners." },
        { id: 13, code: "ICC Publication 784", title: "Collected Opinions of the ICC Banking Commission 2018-2019", description: "Recent opinions addressing contemporary issues. Covers compliance and technology challenges. Includes ISBP 745 related opinions. Current essential reference." },
        { id: 14, code: "ICC Publication 799", title: "Collected Opinions 2020-2021", description: "Latest published collection of Banking Commission opinions. Addresses pandemic-related trade finance issues. Covers digital trade developments. Most current published reference." },
        { id: 15, code: "ICC Guidance Papers", title: "Position papers on specific trade finance topics", description: "ICC position papers on emerging issues. Covers topics not suitable for formal opinions. Provides industry guidance and best practices. Complements formal opinion process." },
        { id: 16, code: "ICC Policy Statements", title: "Official ICC positions on trade finance regulations", description: "ICC advocacy positions on regulatory issues. Addresses Basel, AML, and other regulations. Represents industry voice to regulators. Important for policy understanding." },
        { id: 17, code: "DOCDEX Decisions", title: "Documentary Credit Dispute Resolution Expert Decisions", description: "Published decisions from DOCDEX proceedings. Provides precedent for similar disputes. Covers complex documentary credit issues. Valuable case study resource." },
        { id: 18, code: "ICC Official Opinions on Guarantees", title: "Opinions related to URDG 758 interpretation", description: "Banking Commission opinions on demand guarantees. Interprets URDG 758 provisions. Covers guarantee-specific issues. Essential for guarantee practitioners." },
        { id: 19, code: "ICC Official Opinions on Collections", title: "Opinions related to URC 522 interpretation", description: "Banking Commission opinions on documentary collections. Interprets URC 522 provisions. Covers collection-specific issues. Reference for collection practitioners." },
        { id: 20, code: "ICC Opinions Database (Online)", title: "ICC's digital subscription service", description: "Comprehensive online database of all ICC opinions. Searchable by topic, article, and keyword. Updated with new opinions regularly. Essential subscription for trade finance professionals." },
        { id: 21, code: "ICC Digital Library", title: "Subscription-based access to all ICC trade finance publications", description: "Complete digital access to ICC publications. Includes rules, opinions, and guidance. Regularly updated content. Comprehensive resource for trade finance." }
      ]
    },
    {
      id: "risk-mitigation",
      name: "Risk Mitigation Standards",
      description: "Export credit and investment insurance standards",
      standards: [
        { id: 1, code: "Berne Union Guidelines", title: "Export credit and investment insurance standards", description: "Global association of export credit agencies guidelines. Covers short-term and medium/long-term insurance. Promotes sound underwriting practices. Foundation for ECA operations worldwide." },
        { id: 2, code: "OECD Arrangement on Export Credits", title: "Guidelines for officially supported export credits", description: "OECD framework for government-backed export credits. Sets minimum interest rates and terms. Prevents unfair export credit competition. Binding on OECD participant countries." },
        { id: 3, code: "ICC URCB 524", title: "Rules for contract guarantees in trade finance", description: "ICC rules for contract bonds and guarantees. Covers bid, performance, and payment bonds. Provides standardized terms and conditions. Complements URDG for specific bond types." },
        { id: 4, code: "GDPR", title: "EU General Data Protection Regulation", description: "EU data protection and privacy regulation. Affects trade finance data processing. Requires consent and data protection measures. Significant compliance implications for trade finance." },
        { id: 5, code: "CCPA", title: "California Consumer Privacy Act", description: "California data privacy legislation. Affects US trade finance operations. Requires disclosure and opt-out rights. Growing influence on US privacy standards." },
        { id: 6, code: "BAFT Best Practices for Trade Finance Compliance", title: "Industry compliance guidelines", description: "Industry best practices for trade finance compliance. Covers AML, sanctions, and export controls. Developed by leading trade finance banks. Essential compliance reference." },
        { id: 7, code: "ICC Guidelines on Trade Finance Compliance", title: "ICC compliance recommendations", description: "ICC guidance on trade finance compliance. Addresses regulatory expectations and best practices. Covers documentary credit and guarantee compliance. Complements BAFT guidelines." },
        { id: 8, code: "IMO Ship Identification Number Scheme", title: "Vessel identification standards", description: "International Maritime Organization vessel ID system. Unique identifier for ships worldwide. Essential for vessel due diligence. Required for sanctions screening." },
        { id: 9, code: "AIS Standards", title: "Vessel tracking requirements", description: "Standards for automatic vessel identification and tracking. Enables real-time vessel monitoring. Essential for trade finance vessel due diligence. Supports sanctions and compliance screening." }
      ]
    }
  ]
};

export const itStandardsData: TabData = {
  id: "it-standards",
  name: "IT & Cybersecurity Standards",
  description: "Standards for information technology, cybersecurity, AI governance, and application security relevant to trade finance systems.",
  
  categories: [
    {
      id: "ai-ml",
      name: "AI & Machine Learning Standards",
      description: "Standards for artificial intelligence governance and risk management",
      standards: [
        { id: 1, code: "ISO/IEC 42001:2023", title: "Artificial Intelligence Management System (AIMS)", description: "The world's first AI management system standard. Specifies requirements for establishing, implementing, maintaining, and continually improving an AI management system. Addresses governance, risk management, and responsible AI development. Essential for trade finance platforms incorporating AI/ML capabilities." },
        { id: 2, code: "ISO/IEC 23894:2023", title: "AI Risk Management", description: "Provides guidance on managing risks related to AI systems throughout their lifecycle. Helps organizations identify, assess, and mitigate AI-specific risks. Complements ISO 42001 with detailed risk management guidance. Critical for AI-powered trade finance decision systems." },
        { id: 3, code: "NIST AI RMF 1.0", title: "US AI Risk Management Framework", description: "Voluntary framework to improve ability to incorporate trustworthiness considerations into AI systems. Built on four functions: Govern, Map, Measure, and Manage. Widely referenced for AI governance in financial services. Complements ISO standards for US-based operations." },
        { id: 4, code: "IEEE 7000-2021", title: "Ethical AI System Design", description: "First standard for building ethical systems. Provides a model process for addressing ethical concerns during system design. Guides developers in making products compatible with ethical values. Important for responsible AI deployment in trade finance." }
      ]
    },
    {
      id: "owasp",
      name: "Application Security (OWASP)",
      description: "Open Web Application Security Project standards and guidelines",
      standards: [
        { id: 1, code: "OWASP Top 10 (2021/2025)", title: "Web Application Security Risks", description: "Globally recognized standard awareness document for web application security. Lists the ten most critical security risks to web applications. Includes Broken Access Control, Cryptographic Failures, Injection, and more. Essential baseline for trade finance web application security." },
        { id: 2, code: "OWASP ASVS", title: "Application Security Verification Standard", description: "Provides a basis for testing web application technical security controls. Defines three verification levels for different security requirements. Covers authentication, session management, access control, and more. Essential for trade finance application security assessments." },
        { id: 3, code: "OWASP SAMM", title: "Software Assurance Maturity Model", description: "Framework for assessing and improving software security practices. Covers governance, design, implementation, verification, and operations. Helps organizations build security into their development lifecycle. Essential for trade finance software development teams." },
        { id: 4, code: "OWASP Secure Coding Practices", title: "Secure Development Guidelines", description: "Quick reference guide for secure coding practices. Covers input validation, output encoding, authentication, and more. Essential training resource for trade finance application developers." }
      ]
    }
  ]
};

export const allTabsData: TabData[] = [tradeFinanceData, itStandardsData];
