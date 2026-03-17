// Verwaltet den Sprachzustand der Seite (Deutsch / Englisch):
// - Liest gespeicherte Präferenz aus localStorage oder fällt auf Deutsch zurück
// - Setzt data-i18n (textContent) und data-i18n-html (innerHTML) auf allen Seiten
(() => {
  "use strict";

  const getStoredLang = () => localStorage.getItem("language");
  const setStoredLang = (lang) => localStorage.setItem("language", lang);

  const getPreferredLang = () => {
    const stored = getStoredLang();
    return stored === "de" || stored === "en" ? stored : "de";
  };

  // Berechnet Datumsdifferenz sprachabhängig als "X Jahre Y Monate" / "X years Y months"
  const dateDiff = (startDateStr, lang) => {
    const now = new Date();
    const start = new Date(startDateStr);
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return lang === "en"
      ? `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`
      : `${years} Jahre ${months} Monate`;
  };

  const t = {
    de: {
      // Navigation
      nav_overview: "Übersicht",
      nav_career: "Karriere",
      nav_certificates: "Zertifikate",
      nav_education: "Bildungsweg",
      nav_contact: "Kontakt",
      // 404
      error_404_heading: "Seite nicht gefunden",
      error_404_desc: "Diese Seite existiert leider nicht – aber hier sind ein paar Orte, die es gibt:",
      error_404_home: "Zur Startseite",
      error_404_skills: "Technische Fähigkeiten",
      error_404_about: "Über diese Seite",
      // Hero
      hero_greeting: "Hallo, ich bin Özgün.<br />Data Analyst.<br />",
      hero_cta: "Kontakt aufnehmen",
      // Übersicht
      section_overview: "Übersicht",
      overview_tech_skills: "Technische Fähigkeiten",
      overview_skills_more: "mehr hierzu lesen",
      overview_profile: "Profil",
      profile_data_analysis: "Datenanalyse",
      profile_data_viz: "Datenvisualisierung",
      overview_work_exp: "Berufserfahrung",
      overview_studies: "Studium",
      overview_degree: "BWL B.Sc.",
      overview_certificates: "Zertifikate",
      overview_excel_course: "Excel Kurs",
      overview_languages: "Sprachen",
      lang_german: "Deutsch",
      lang_german_level: "Muttersprache",
      lang_english: "Englisch",
      lang_english_level: "Verhandlungssicher",
      lang_turkish: "Türkisch",
      lang_turkish_level: "Fließend",
      // Berufliche Laufbahn
      section_career: "Berufliche Laufbahn",
      career_axa_date: "Juli 2022 - heute",
      career_axa_location: "Köln",
      career_axa_dept: "AXA Deutschland › Sachversicherung › Schaden › Analytik & Steuerung",
      career_axa_li1:
        "Analyse und Aufbereitung von Schadendaten zur Unterstützung strategischer und operativer Entscheidungen",
      career_axa_li2:
        "Aufbau von PowerBI-Dashboards mit etwa 200 Aufrufen täglich, die Ad-hoc-Anfragen deutlich reduzierten",
      career_axa_li3:
        "Gestaltung und Optimierung von ETL-Prozessen in Snowflake zur automatisierten Datenbereitstellung mit integrierten Datenqualitätsprüfungen und Scheduling",
      internship_badge: "Praktikum",
      career_henkel_dept: "Henkel Deutschland › Adhesive Technologies › Customer Service › Automotive & Aerospace",
      career_henkel_date: "Dezember 2021 - Juni 2022",
      career_henkel_duration: "6 Monate",
      career_henkel_li1: "Selbstständige Leitung eines Projektes, um Kunden-Stammdaten-Qualität zu erhöhen",
      career_henkel_li1a: "Erhebung von Daten zu Ansprechpartnern der Kunden aus SAP-ERP und weiteren Quellen",
      career_henkel_li1b: "Datenaufbereitung für Upload in SAP-Service-Cloud und Einführung der Salesforce CRM",
      // Zertifikate
      section_certificates: "Zertifikate",
      cert_excelhero_date: "Oktober 2021 - Dezember 2021",
      cert_excelhero_title: "Excel Kurs Komplettpaket",
      cert_duration_2: "2 Monate",
      cert_google_date: "Januar 2022 - April 2022",
      cert_duration_4: "4 Monate",
      cert_datacamp_li1: "Zertifizierung zum Data Analyst mit Schwerpunkten SQL und Python",
      cert_datacamp_li2: "Python: Datenimport, -bereinigung und -visualisierung mit Pandas, NumPy, Matplotlib, Seaborn",
      cert_datacamp_li3: "SQL: Syntax, Joins, Window Functions, CTEs",
      cert_link: "zum Zertifikat",
      cert_excelhero_li1: "Fokus aus Formeln, Funktionen, Pivot-Tabellen und Datenvisualisierung",
      cert_excelhero_li2: "Kapitel zu Power Query und DAX",
      cert_excelhero_li3: "VBA-Grundlagen: Fokus auf Makrorekorder",
      cert_google_li1: "SQL mit Google BigQuery",
      cert_google_li2: "Tableau mit Erarbeitung eigener Dashboards",
      cert_google_li3: "R: Ergänzung zum Studiumswissen",
      cert_google_li4: "Theoretischer Fokus: strukturiertes Denken und Rolle des Data Analysts",
      // Bildungsweg
      section_education: "Bildungsweg",
      edu_hhu_date: "Oktober 2017 – September 2021",
      edu_degree: "Betriebswirtschaftslehre B.Sc.",
      edu_hhu_name: "Heinrich-Heine-Universität",
      edu_hhu_li1: "Notendurchschnitt: 2,2",
      edu_hhu_li2: "Wahlpflichtmodule: Accounting, Praxisseminar Accounting, Management, Datenanalyse, Ökonometrie",
      edu_hhu_li3: "Bachelorarbeit: That's too much Information!? Was Big Data für Controlling und Controller bedeutet",
      edu_gym_date: "September 2009 – Juli 2017",
      edu_abitur: "Abitur",
      edu_gym_li1: "Notendurchschnitt: 1,6",
      edu_gym_li2: "Prüfungsfächer: Mathematik, Sozialwissenschaften, Englisch, Philosophie",
      // Kontakt
      section_contact: "Kontakt",
      contact_summary_heading: "Zusammenfassung",
      contact_summary_text:
        "Ich arbeite daran, aus Daten klare, verständliche und handlungsorientierte Erkenntnisse zu gewinnen.",
      contact_reach_heading: "Mich erreichen",
      contact_about_heading: "Über diese Seite",
      contact_about_link: "Wie und warum ich diese Seite gebaut habe",
      footer_imprint: "Impressum",
      // Skills-Seite
      skills_page_title: "Meine technischen Fähigkeiten",
      skills_back: "zurück",
      skills_strength: "Stärke",
      skills_where: "Wo ich damit gearbeitet habe",
      // SQL
      sql_p1:
        "SQL sehe ich als eine meiner Stärken und Lieblingsaufgaben bei meiner Arbeit. Hierbei mag ich es, auch längere und komplexere Skripte mit mehreren CTEs oder aufeinander aufbauenden Views zu schreiben.",
      sql_p2:
        "Mit SQL baue ich hauptsächlich Datenpipelines für Dashboards. Dies umfasst neben der Datenabfrage gegebenenfalls auch komplexere Transformationen. Ich kann dafür alle Vorzüge von SQL nutzen – also neben den Standardfunktionen unter anderem auch Window Functions.",
      sql_p3:
        "Beruflich arbeite ich mit Snowflake. Dabei schätze ich es, besondere Funktionen von Snowflake anwenden zu können, wie beispielsweise <code>QUALIFY</code>, um die aus Window Functions resultierenden Spalten zu filtern. Ein weiteres Beispiel wäre <code>GROUP BY ALL</code>, um bei <code>GROUP BY</code>-Befehlen nicht alle zu gruppierenden Spalten aufzählen zu müssen.",
      // Power BI
      powerbi_p1:
        "In den letzten Jahren habe ich viel mit Power BI arbeiten können. Dabei habe ich Power BI schätzen gelernt, frustriere mich aber auch regelmäßig über die Eigenarten des Programms.",
      powerbi_p2:
        "Ich baue besonders gerne automatisierte Power BI-Apps mit geringem Wartungsbedarf. Die Measures schreibe ich strukturiert, wobei sie nur das berechnen, was ich nicht bereits in der Datenpipeline bereitstellen kann – auf berechnete Spalten verzichte ich dabei bewusst.",
      powerbi_p3:
        "Auf das Design lege ich großen Wert und versuche die User Experience auch durch möglichst kurze Ladezeiten zu optimieren. Funktionen wie Feld-Parameter für selbst konfigurierbare Visualisierungen sowie Kartenvisualisierungen bis auf Hausebene gehören dabei zu Aufgaben, die ich bereits umgesetzt habe.",
      // Python
      python_p1:
        "Mit Python arbeite ich seit dem Studium gerne. Beruflich nutze ich Python vor allem dort, wo SQL an seine Grenzen stößt.",
      python_p2:
        "Meine Arbeit umfasst vor allem die klassischen Libraries für Datenverarbeitung wie Pandas und NumPy, aber auch Plotly für Visualisierungen.",
      python_p3:
        "Privat habe ich ebenfalls bereits häufiger mit Streamlit gearbeitet. Damit lassen sich Ergebnisse aus Python unkompliziert im Browser visualisieren – so zum Beispiel eine Auswertung meiner Kontoausgaben, die ich damit regelmäßig verfolge.",
      // Git
      git_p1:
        "Bei meiner Arbeit nutze ich Git und GitHub für die Versionskontrolle. GitHub habe ich dabei sehr schätzen gelernt und möchte auf die Vorteile nicht mehr verzichten.",
      git_p2:
        "Ich kann auch über die CLI arbeiten, nutze jedoch meistens die Git-Integration von PyCharm. Die gängigen Befehle beherrsche ich sicher, wobei Situationen wie Merge Conflicts selten ein Problem darstellen.",
      // Excel
      excel_p1:
        "Nachdem ich im Laufe der Jahre immer wieder mit Excel gearbeitet hatte, entschied ich mich für eine intensivere Auseinandersetzung mit dem Programm - mithilfe eines Kurses auf Udemy. Dadurch konnte ich die Vorzüge kennenlernen und meine Fähigkeiten ausbauen.",
      excel_p2:
        "Als Praktikant bei Henkel konnte ich diese Fähigkeiten einsetzen und mir im Team den Ruf als Ansprechperson für Excel-Fragen erarbeiten.",
      excel_p3:
        "Mittlerweile arbeite ich deutlich weniger intensiv mit Excel. Dennoch kommt das Programm für schnelle Berechnungen und klassische Anwendungsfälle regelmäßig zum Einsatz.",
      // PowerPoint
      ppt_p1:
        "PowerPoint begleitet mich seit meiner Schulzeit – von einfachen Präsentationen bis hin zu strukturierten Vorträgen im Studium und im Beruf.",
      ppt_p2:
        "Im Praktikum bei Henkel nutzte ich PowerPoint regelmäßig, um Analysen und Ergebnisse klar und ansprechend zu präsentieren.",
      ppt_p3:
        "Mittlerweile setze ich PowerPoint seltener ein, da ich Inhalte zunehmend direkt in interaktiven Dashboards oder Reports aufbereite.",
      // Streamlit
      streamlit_p1:
        "Streamlit nutze ich ausschließlich für private Projekte – als schnelle Möglichkeit, Python-Auswertungen interaktiv erlebbar zu machen.",
      streamlit_p2:
        "Entstanden sind dabei unter anderem eine App zur Analyse meiner persönlichen Finanzen sowie ein Dashboard, das mein chess.com-Profil und meine Partien auswertet.",
      streamlit_p3:
        "Beruflich setze ich Streamlit bisher nicht ein – es ist für mich ein Werkzeug, um Ideen schnell umzusetzen und Daten auf eigene Fragestellungen hin zu erkunden.",
      // HTML & CSS
      htmlcss_p1:
        "Im Rahmen der Arbeiten an dieser Seite habe ich mich intensiv mit HTML und CSS auseinandergesetzt. Ich schätze die gestalterischen Möglichkeiten, die mir die Arbeit an dieser Seite bietet.",
      htmlcss_p2:
        "Nennenswert ist auch, wie mein Verständnis für den Aufbau von Webseiten in dieser Zeit gewachsen ist. Mit JavaScript hatte ich dabei ebenfalls Berührungspunkte – ein tieferes Verständnis habe ich jedoch bewusst nicht angestrebt.",
      // Tableau
      tableau_p1:
        "Tableau habe ich im Rahmen des Google Data Analytics-Zertifikats kennengelernt, wo es als zentrales Visualisierungswerkzeug eingesetzt wurde.",
      tableau_p2:
        "Ich habe die Grundlagen erlernt und erste Dashboards erstellt – beruflich oder in eigenen Projekten nutze ich Tableau bisher jedoch nicht aktiv.",
      // Skill-Pills
      skill_axa: "Data Analyst bei AXA",
      skill_datacamp_pill: "DataCamp: Data Analyst Professional",
      skill_google_pill: "Google Data Analytics Certificate",
      skill_uni_workshop: "Uni-Workshop",
      skill_henkel_intern: "Customer Service Intern bei Henkel",
      skill_excelhero_pill: "ExcelHero: Excel Kurs Komplettpaket",
      skill_home: "Privat bei mir zuhause",
      skill_this_site: "mit dieser Seite hier",
      // Über die Seite
      about_page_title: "Über die Seite selbst",
      about_back: "zurück",
      about_section1_title: "Wie alles begann",
      about_motivation_heading: "Motivation",
      about_motivation_p1: "Für die Bewerbungsphase im Mai 2022 habe ich eine eigene Internetseite erstellt.",
      about_motivation_p2:
        "Der Grund dafür war, dass ich einige Inhalte in meinem Lebenslauf unterbringen wollte, für die dort kein Platz mehr war. Dazu gehörten Links zu einzelnen Projekten aus meinem Portfolio sowie Texte zu Kursen, die ich außerhalb meines Studiums absolviert habe. Zusätzlich fand ich die Idee einer eigenen Internetseite spannend und wollte einen weiteren Punkt haben, mit dem ich aus der Masse herausstechen konnte.",
      about_how_built_heading: "Wie ich die Seite gebaut hatte",
      about_how_built_p1:
        "Über Google Sites hatte ich mir die Seite zusammengeklickt. So konnte ich eine Seite schnell und ohne viel technischen Aufwand basteln.",
      about_how_built_p2:
        "Die Domain hatte ich über Google Domains gekauft und mit der Seite verknüpft. Die einzigen Kosten, die die Webseite verursachte, waren 7 € pro Jahr für die Domain.",
      about_old_portfolio_heading: "Mein damaliges Portfolio",
      about_old_portfolio_p1:
        "Mein Portfolio basierte im Wesentlichen auf meinen eigenen Daten. Dabei hatte ich von den jeweiligen Diensten meine Daten angefordert und diese ausgewertet.",
      about_old_portfolio_p2:
        "Meine Amazon-Daten hatte ich mit Excel und PowerPoint ausgewertet. Tableau hatte ich benutzt, um meine Netflix- und Spotify-Daten zu visualisieren. Die SQL-Queries und die PowerPoint-Präsentation von meiner DataCamp-Zertifizierung hatte ich auch hochgeladen.",
      about_old_portfolio_p3: "Aktuell sehe ich aber keinen Bedarf mehr für ein Portfolio.",
      about_google_sites_start: "Der Beginn mit Google Sites",
      about_portfolio_box_title: "Mein damaliges Portfolio",
      about_spotify_box_title: "Spotify-Dashboard",
      about_modal_gs_title: "Der Beginn mit Google Sites",
      about_modal_gs_caption:
        "So sah die Startseite aus. Ich hatte damals schon die Domain, sodass oben <code>www.özgüncakir.de</code> stand.",
      about_modal_portfolio_title: "Mein damaliges Portfolio",
      about_modal_portfolio_caption: "Die Bilder habe ich übrigens mit Canva gestaltet.",
      about_modal_spotify_title: "Spotify-Dashboard",
      about_modal_spotify_caption:
        "Mittlerweile sehen meine Dashboards ganz anders aus. Seitdem habe ich auch nicht mehr mit Tableau gearbeitet.",
      about_section2_title: "Der nächste Schritt",
      about_end_heading: "Das Ende der alten Seite",
      about_end_p1: "Nach einer erfolgreichen Bewerbungsphase konnte meine Seite ihren Zweck erfüllen.",
      about_end_p2:
        "Jedoch hatte mich der Ehrgeiz gepackt, eine eigene Seite zu bauen, statt sie nur zusammenzuklicken. Die Seite sollte auch für Mobilgeräte optimiert werden können und beim Design wollte ich mehr Möglichkeiten haben. Ich habe auch Spaß an Projekten dieser Art. Ich mag es nämlich, mich hinzusetzen und mit technischen Problemen herumzuschlagen, während ich etwas baue. So habe ich diese neue Seite bereits Mitte 2022 begonnen und in vielen kleinen Schritten langsam bearbeitet.",
      about_webflow_heading: "Neuer Versuch mit Webflow",
      about_webflow_p1:
        "Zuerst habe ich mit Webflow versucht, die neue Seite zu erstellen. Webflow bietet zwar wesentlich mehr Funktionen als Google Sites, das ging mir aber hinsichtlich der Anpassungsmöglichkeiten nicht weit genug. Zudem wollte ich nicht schon wieder mit einem Baukasten arbeiten müssen und davon abhängig sein. Das Ganze führte dazu, dass ich mich eines Tages bereit fühlte, eine Seite selbst auf die Beine zu stellen und den Code dafür zu schreiben.",
      about_outdated_heading: "Mittlerweile überholte Entscheidungen",
      about_outdated_p1:
        "Zu Beginn war die Seite wesentlich bunter, seitdem habe ich aber die Farbvielfalt reduziert. Das lag zum einen daran, dass die Seite etwas professioneller aussehen sollte, aber auch um einen Dark-Mode besser einführen zu können.",
      about_outdated_p3:
        "Die Seite hatte eine Seitenleiste, statt einer Navigationsleiste oben. Die Seitenleiste habe ich nach oben verschoben, um ein einheitlicheres Design unabhängig von der Bildschirmgröße zu ermöglichen. Dadurch stand auch der Inhalt mehr im Zentrum.",
      about_productivity_heading: "Produktivität der Seite",
      about_productivity_p1:
        "Ich hatte die erste Version der Seite schon im September 2022 deployed. Dies lief über GitHub Pages. Dadurch konnte ich die Seite einfach und kostenlos über GitHub hosten.",
      about_productivity_p2:
        "Das zugehörige Repository habe ich aber mittlerweile archiviert. Es ist voller kleiner Commits, die teilweise ein wenig fragwürdig erscheinen. Außerdem kann es sein, dass ich auf Prod getestet habe. Da versteht es sich, dass ich meine Spuren verwischen möchte und mit einem neuen Repository angefangen habe.",
      about_productivity_p3:
        "Die Seite habe ich zwischenzeitlich runtergenommen. Das lag daran, dass sie die ganze Zeit unvollständig war und ich mich so zwingen wollte, sie endlich abzuschließen.",
      about_modal_gs_sep_title: "Die Trennung von Google Sites",
      about_webflow_new_start: "Neuer Anfang mit Webflow",
      about_sidebar_title: "Seite mit Seitenleiste",
      about_old_summary_title: "Die alte Zusammenfassung",
      about_modal_gs_sep_caption: "Eine schöne Visualisierung meiner Trennung mit Google Sites.",
      about_modal_webflow_caption: "Webflow kann viel mehr als Google Sites, aber leider nicht genug.",
      about_modal_sidebar_caption: "Wenn ich die Seite wieder so sehe, vermisse ich das schöne Blau.",
      about_modal_summary_caption: "Man beachte mein damaliges Selbstbewusstsein hinsichtlich R.",
      about_section3_title: "Mein Design",
      about_colors_heading: "Farbenauswahl",
      about_colors_text:
        'Bei der Wahl der Hauptfarben war <a href="https://mycolor.space/?hex=%23107C7C&amp;sub=1" target="_blank" rel="noopener noreferrer">mycolor.space</a> besonders hilfreich. Die Entscheidung fiel mir nicht leicht, mittlerweile bin ich aber zufrieden.',
      about_light_mode: "Light-Mode",
      about_primary_color: "Primärfarbe",
      about_accent_color: "Akzentfarbe",
      about_dark_mode_label: "Dark-Mode",
      about_canva_heading: "Bildbearbeitung",
      about_canva_p1:
        "Für die Bildbearbeitung habe ich Canva genutzt. Canva funktioniert einfach und macht so ziemlich alles was ich brauche.",
      about_bootstrap_heading: "Bootstrap als front-end framework",
      about_bootstrap_text:
        'Ich benutze <a href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer">Bootstrap</a> für meine Seite, so wie es 19 % aller Internetseiten machen. Bootstrap bietet viele Designvorlagen für die Knöpfe, die Navigationsleiste, den Dark-Mode und vieles mehr.',
      about_dark_mode_screenshot: "Seite im Dark Mode",
      about_canva_work_title: "Arbeit mit Canva",
      about_hover_heading: "Hover.css",
      about_hover_text:
        'Für die Schrumpfen- und Vergrößerungs-Animation habe ich <a href="https://github.com/IanLunn/Hover" target="_blank" rel="noopener noreferrer">Hover.css von Ian Lunn</a> verwendet. Die Schrumpfen-Animation gefällt mir so sehr, dass ich sie fast überall verwendet habe.',
      about_modal_dark_mode_title: "Seite im Dark Mode",
      about_modal_dark_mode_caption:
        "Stellt gerne bei euch den Dark-Modus ein und bewundert die Seite gleich noch einmal.",
      about_modal_canva_title: "Arbeit mit Canva",
      about_modal_canva_caption:
        "Zur Demonstration meiner grafischen Fähigkeiten habe ich dieses Bild herbeigezaubert.",
      // Impressum
      imprint_title: "Impressum",
      imprint_contact_heading: "Kontakt",
      imprint_privacy_title: "Datenschutzerklärung",
      imprint_date: "Stand: 31. Dezember 2024",
      imprint_controller_h: "Verantwortlicher",
      imprint_controller_address: "Özgün Cakir<br />Schumannstr. 20<br />40237 Düsseldorf, Deutschland",
      imprint_email_line: 'E-Mail-Adresse: <a href="mailto:oezguen.cakir@posteo.de">oezguen.cakir@posteo.de</a>',
      imprint_hosting_h: "Hosting",
      imprint_hosting_intro: "Mein Hoster erhebt in sog. Logfiles folgende Daten, die Ihr Browser übermittelt:",
      imprint_li_ip: "IP-Adresse,",
      imprint_li_referer: "die Adresse der vorher besuchten Website (Referer Anfrage-Header),",
      imprint_li_datetime: "Datum und Uhrzeit der Anfrage,",
      imprint_li_timezone: "Zeitzonendifferenz zur Greenwich Mean Time,",
      imprint_li_content: "Inhalt der Anforderung,",
      imprint_li_status: "HTTP-Statuscode,",
      imprint_li_data_amount: "übertragene Datenmenge,",
      imprint_li_browser: "und Informationen zu Browser und Betriebssystem.",
      imprint_hosting_p1:
        "Das ist erforderlich, um die Website anzuzeigen und die Stabilität und Sicherheit zu gewährleisten.<br />Dies entspricht meinem berechtigten Interesse im Sinne des Art. 6 Abs. 1 S. 1 lit. f DSGVO.",
      imprint_hosting_p2: "Es erfolgt kein Tracking und ich habe auf diese Daten keinen direkten Zugriff.",
      imprint_hosting_p3: "Ich setze für die Zurverfügungstellung der Website folgenden Hoster ein:",
      imprint_hosting_p4:
        "Dieser ist Empfänger Ihrer personenbezogenen Daten. Dies entspricht meinem berechtigten Interesse im Sinne des Art. 6 Abs. 1 S. 1 lit. f DSGVO, selbst keinen Server in meinen Räumlichkeiten vorhalten zu müssen. Serverstandort ist USA.",
      imprint_hosting_p5:
        "Weitere Informationen zu Widerspruchs- und Beseitigungsmöglichkeiten gegenüber GitHub finden Sie unter:",
      imprint_hosting_p6:
        "Sie haben das Recht der Verarbeitung zu widersprechen. Ob der Widerspruch erfolgreich ist, ist im Rahmen einer Interessenabwägung zu ermitteln.",
      imprint_hosting_p7: "Die Daten werden gelöscht, sobald der Zweck der Verarbeitung entfällt.",
      imprint_hosting_p8:
        "Die Verarbeitung der unter diesem Abschnitt angegebenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Die Funktionsfähigkeit der Website ist ohne die Verarbeitung nicht gewährleistet.",
      imprint_hosting_p9:
        "GitHub hat Compliance-Maßnahmen für internationale Datenübermittlungen umgesetzt. Diese gelten für alle weltweiten Aktivitäten, bei denen GitHub personenbezogene Daten von natürlichen Personen in der EU verarbeitet. Diese Maßnahmen basieren auf den EU-Standardvertragsklauseln (SCCs). Weitere Informationen finden Sie unter:",
      imprint_legal_h: "Rechtliche Hinweise",
      imprint_legal_p1_pre:
        'Grundsätzlich ist ein Auftragsverarbeitungsvertrag mit dem Hoster abzuschließen. Das bayerische Landesamt für Datenschutzaufsicht hat für das Hosting rein statischer Websites eine Ausnahme gemacht. Für den Fall, dass die Webseite der Selbstdarstellung dient, z.B. von Vereinen oder Kleinunternehmen, keine personenbezogenen Daten an den Betreiber fließen und kein Tracking stattfindet, liegt keine Auftragsverarbeitung vor. Weiter heißt es: „Die Tatsache, dass auch beim Hosting von statischen Webseiten zwangsläufig IP-Adressen, d.h. personenbezogene Daten, verarbeitet werden müssen, führt nicht zur Annahme einer Auftragsverarbeitung. Das wäre nicht sachgerecht. Die (kurzfristige) IP-Adressenspeicherung ist vielmehr noch der TK-Zugangsvermittlung des Website-Hosters nach dem TKG zuzurechnen und dient in erster Linie Sicherheitszwecken des Hosters."',
      imprint_legal_p1_post: "Ich gehe davon aus, dass diese Ausnahme auf GitHub Pages anzuwenden ist.",
      imprint_source: "Quelle:",
    },

    en: {
      // Navigation
      nav_overview: "Overview",
      nav_career: "Career",
      nav_certificates: "Certificates",
      nav_education: "Education",
      nav_contact: "Contact",
      // 404
      error_404_heading: "Page Not Found",
      error_404_desc: "This page doesn't exist – but here are a few places that do:",
      error_404_home: "Go to Homepage",
      error_404_skills: "Technical Skills",
      error_404_about: "About this Site",
      // Hero
      hero_greeting: "Hello, I'm Özgün.<br />Data Analyst.<br />",
      hero_cta: "Get in touch",
      // Overview
      section_overview: "Overview",
      overview_tech_skills: "Technical Skills",
      overview_skills_more: "read more",
      overview_profile: "Profile",
      profile_data_analysis: "Data Analysis",
      profile_data_viz: "Data Visualization",
      overview_work_exp: "Work Experience",
      overview_studies: "Studies",
      overview_degree: "BBA",
      overview_certificates: "Certificates",
      overview_excel_course: "Excel Course",
      overview_languages: "Languages",
      lang_german: "German",
      lang_german_level: "Native",
      lang_english: "English",
      lang_english_level: "Proficient",
      lang_turkish: "Turkish",
      lang_turkish_level: "Fluent",
      // Career
      section_career: "Career",
      career_axa_date: "July 2022 - present",
      career_axa_location: "Cologne",
      career_axa_dept: "AXA Germany › Property Insurance › Claims › Analytics & Steering",
      career_axa_li1: "Analysis and processing of claims data to support strategic and operational decisions",
      career_axa_li2:
        "Development of Power BI dashboards with approximately 200 daily views, significantly reducing ad-hoc requests",
      career_axa_li3:
        "Design and optimization of ETL processes in Snowflake for automated data provisioning with integrated data quality checks and scheduling",
      internship_badge: "Internship",
      career_henkel_dept: "Henkel Germany › Adhesive Technologies › Customer Service › Automotive & Aerospace",
      career_henkel_date: "December 2021 - June 2022",
      career_henkel_duration: "6 months",
      career_henkel_li1: "Independent management of a project to improve customer master data quality",
      career_henkel_li1a: "Collection of customer contact data from SAP ERP and other sources",
      career_henkel_li1b: "Data preparation for upload into SAP Service Cloud and introduction of Salesforce CRM",
      // Certificates
      section_certificates: "Certificates",
      cert_excelhero_date: "October 2021 - December 2021",
      cert_excelhero_title: "Excel Complete Course",
      cert_duration_2: "2 months",
      cert_google_date: "January 2022 - April 2022",
      cert_duration_4: "4 months",
      cert_datacamp_li1: "Certification as Data Analyst with focus on SQL and Python",
      cert_datacamp_li2: "Python: data import, cleaning, and visualization with Pandas, NumPy, Matplotlib, Seaborn",
      cert_datacamp_li3: "SQL: syntax, joins, window functions, CTEs",
      cert_link: "view certificate",
      cert_excelhero_li1: "Focus on formulas, functions, pivot tables, and data visualization",
      cert_excelhero_li2: "Chapters on Power Query and DAX",
      cert_excelhero_li3: "VBA basics: focus on macro recorder",
      cert_google_li1: "SQL with Google BigQuery",
      cert_google_li2: "Tableau with creation of own dashboards",
      cert_google_li3: "R: supplement to university knowledge",
      cert_google_li4: "Theoretical focus: structured thinking and the role of the data analyst",
      // Education
      section_education: "Education",
      edu_hhu_date: "October 2017 – September 2021",
      edu_degree: "Business Administration B.Sc.",
      edu_hhu_name: "Heinrich Heine University",
      edu_hhu_li1: "GPA: 2.2 (German scale)",
      edu_hhu_li2: "Elective modules: Accounting, Accounting Seminar, Management, Data Analysis, Econometrics",
      edu_hhu_li3:
        "Bachelor's thesis: That's too much Information!? What Big Data means for management accounting and management accountants",
      edu_gym_date: "September 2009 – July 2017",
      edu_abitur: "Abitur (High School Diploma)",
      edu_gym_li1: "GPA: 1.6 (German scale)",
      edu_gym_li2: "Exam subjects: Mathematics, Social Sciences, English, Philosophy",
      // Contact
      section_contact: "Contact",
      contact_summary_heading: "Summary",
      contact_summary_text: "I work on turning data into clear, understandable, and actionable insights.",
      contact_reach_heading: "Reach me",
      contact_about_heading: "About this website",
      contact_about_link: "How and why I built this website",
      footer_imprint: "Imprint",
      // Skills page
      skills_page_title: "My Technical Skills",
      skills_back: "back",
      skills_strength: "Strength",
      skills_where: "Where I've used it",
      // SQL
      sql_p1:
        "I consider SQL one of my strengths and favorite tasks at work. I enjoy writing longer, more complex scripts with multiple CTEs or interdependent views.",
      sql_p2:
        "I primarily use SQL to build data pipelines for dashboards. This includes not only data retrieval but also more complex transformations. I can leverage all the advantages SQL offers — including window functions in addition to standard functions.",
      sql_p3:
        "Professionally, I work with Snowflake. I appreciate being able to use Snowflake-specific features, such as <code>QUALIFY</code> to filter columns resulting from window functions. Another example is <code>GROUP BY ALL</code>, which avoids having to list all grouping columns in <code>GROUP BY</code> statements.",
      // Power BI
      powerbi_p1:
        "Over the past few years, I've had the opportunity to work extensively with Power BI. I've come to appreciate it, but I also regularly get frustrated with its quirks.",
      powerbi_p2:
        "I particularly enjoy building automated Power BI apps with low maintenance requirements. I write measures in a structured way, calculating only what I can't already provide in the data pipeline — I deliberately avoid calculated columns.",
      powerbi_p3:
        "I place great importance on design and try to optimize the user experience through fast loading times. I've already implemented features like field parameters for user-configurable visualizations and map visualizations down to the building level.",
      // Python
      python_p1:
        "I've enjoyed working with Python since my university days. Professionally, I use Python mainly where SQL reaches its limits.",
      python_p2:
        "My work primarily involves the classic data processing libraries such as Pandas and NumPy, as well as Plotly for visualizations.",
      python_p3:
        "Personally, I've also worked with Streamlit on several occasions. It makes it easy to visualize Python results interactively in a browser — for example, an analysis of my bank account expenses that I regularly track with it.",
      // Git
      git_p1:
        "I use Git and GitHub for version control at work. I've come to greatly appreciate GitHub and wouldn't want to give up its benefits.",
      git_p2:
        "I can also work via the CLI, but mostly use PyCharm's Git integration. I'm confident with common commands, and situations like merge conflicts rarely pose a problem.",
      // Excel
      excel_p1:
        "After working with Excel on and off over the years, I decided to deepen my skills with an intensive Udemy course. This allowed me to discover its strengths and expand my abilities.",
      excel_p2:
        "As an intern at Henkel, I was able to put these skills to use and built a reputation within the team as the go-to person for Excel questions.",
      excel_p3:
        "Nowadays, I work much less intensively with Excel. However, the tool still comes into regular use for quick calculations and classic use cases.",
      // PowerPoint
      ppt_p1:
        "PowerPoint has been part of my life since school — from simple presentations to structured talks during my studies and at work.",
      ppt_p2:
        "During my internship at Henkel, I regularly used PowerPoint to present analyses and results clearly and engagingly.",
      ppt_p3:
        "Nowadays I use PowerPoint less frequently, as I increasingly prepare content directly in interactive dashboards or reports.",
      // Streamlit
      streamlit_p1:
        "I use Streamlit exclusively for personal projects — as a quick way to make Python analyses interactive and explorable.",
      streamlit_p2:
        "Projects I've built include an app for analyzing my personal finances and a dashboard that evaluates my chess.com profile and games.",
      streamlit_p3:
        "I don't use Streamlit professionally — it's a tool for me to quickly implement ideas and explore data for my own questions.",
      // HTML & CSS
      htmlcss_p1:
        "While working on this website, I've engaged deeply with HTML and CSS. I appreciate the creative possibilities that building this site offers.",
      htmlcss_p2:
        "Also noteworthy is how my understanding of how websites are structured has grown during this time. I've also had touchpoints with JavaScript — though I haven't deliberately pursued a deeper understanding of it.",
      // Tableau
      tableau_p1:
        "I got to know Tableau through the Google Data Analytics certificate, where it was used as the primary visualization tool.",
      tableau_p2:
        "I learned the basics and created my first dashboards — but I haven't actively used Tableau professionally or in personal projects since.",
      // Skill pills
      skill_axa: "Data Analyst at AXA",
      skill_datacamp_pill: "DataCamp: Data Analyst Professional",
      skill_google_pill: "Google Data Analytics Certificate",
      skill_uni_workshop: "University Workshop",
      skill_henkel_intern: "Customer Service Intern at Henkel",
      skill_excelhero_pill: "ExcelHero: Excel Complete Course",
      skill_home: "Personally at home",
      skill_this_site: "with this website",
      // About page
      about_page_title: "About This Website",
      about_back: "back",
      about_section1_title: "How It All Began",
      about_motivation_heading: "Motivation",
      about_motivation_p1: "I created my own website for the application phase in May 2022.",
      about_motivation_p2:
        "The reason was that I wanted to include some content in my CV that no longer fit. This included links to individual projects from my portfolio as well as descriptions of courses I had taken outside of my studies. I also found the idea of having my own website exciting and wanted another way to stand out from the crowd.",
      about_how_built_heading: "How I Built the Site",
      about_how_built_p1:
        "I put the site together using Google Sites. This allowed me to build a page quickly and without much technical effort.",
      about_how_built_p2:
        "I bought the domain through Google Domains and linked it to the site. The only cost the website incurred was €7 per year for the domain.",
      about_old_portfolio_heading: "My Portfolio Back Then",
      about_old_portfolio_p1:
        "My portfolio was essentially based on my own data. I had requested data from various services and analyzed it.",
      about_old_portfolio_p2:
        "I analyzed my Amazon data with Excel and PowerPoint. I used Tableau to visualize my Netflix and Spotify data. I also uploaded the SQL queries and PowerPoint presentation from my DataCamp certification.",
      about_old_portfolio_p3: "Currently, I no longer see the need for a portfolio.",
      about_google_sites_start: "The Beginning with Google Sites",
      about_portfolio_box_title: "My Portfolio Back Then",
      about_spotify_box_title: "Spotify Dashboard",
      about_modal_gs_title: "The Beginning with Google Sites",
      about_modal_gs_caption:
        "This is what the homepage looked like. I already had the domain at that time, so it showed <code>www.özgüncakir.de</code> at the top.",
      about_modal_portfolio_title: "My Portfolio Back Then",
      about_modal_portfolio_caption: "By the way, I designed the images using Canva.",
      about_modal_spotify_title: "Spotify Dashboard",
      about_modal_spotify_caption:
        "My dashboards look quite different nowadays. I haven't worked with Tableau since then either.",
      about_section2_title: "The Next Step",
      about_end_heading: "The End of the Old Site",
      about_end_p1: "After a successful application phase, my website had served its purpose.",
      about_end_p2:
        "However, ambition took over — I wanted to build my own site from scratch rather than just clicking one together. I also wanted more design flexibility and mobile optimization. I enjoy projects like this: sitting down and wrestling with technical challenges while building something. So I started this new site in mid-2022 and slowly worked on it in many small steps.",
      about_webflow_heading: "New Attempt with Webflow",
      about_webflow_p1:
        "I first tried to build the new site with Webflow. While Webflow offers far more features than Google Sites, it still didn't give me enough flexibility in terms of customization. I also didn't want to rely on a website builder again. All of this led me to one day feel ready to build a site myself and write the code for it.",
      about_outdated_heading: "Decisions That Have Since Been Revised",
      about_outdated_p1:
        "Initially the site was much more colorful, but since then I've reduced the variety of colors. This was partly to make the site look more professional and also to make it easier to introduce a dark mode.",
      about_outdated_p3:
        "The site used to have a sidebar instead of a top navigation bar. I moved the sidebar to the top to enable a more consistent design regardless of screen size. This also brought the content more into focus.",
      about_productivity_heading: "Going Live",
      about_productivity_p1:
        "I had the first version of the site deployed back in September 2022. This ran on GitHub Pages, allowing me to host the site easily and for free.",
      about_productivity_p2:
        "I've since archived the associated repository. It was full of small commits, some of which were a bit questionable. I may have also tested on production. Naturally, I wanted to cover my tracks and start fresh with a new repository.",
      about_productivity_p3:
        "I temporarily took the site offline. This was because it was incomplete for a long time and I wanted to force myself to finally finish it.",
      about_modal_gs_sep_title: "Breaking Up with Google Sites",
      about_webflow_new_start: "A Fresh Start with Webflow",
      about_sidebar_title: "Site with Sidebar",
      about_old_summary_title: "The Old Summary",
      about_modal_gs_sep_caption: "A nice visualization of my breakup with Google Sites.",
      about_modal_webflow_caption: "Webflow can do much more than Google Sites, but unfortunately not enough.",
      about_modal_sidebar_caption: "Looking at the site like this again, I miss the beautiful blue.",
      about_modal_summary_caption: "Note my confidence regarding R back then.",
      about_section3_title: "My Design",
      about_colors_heading: "Color Choices",
      about_colors_text:
        'In choosing the main colors, <a href="https://mycolor.space/?hex=%23107C7C&amp;sub=1" target="_blank" rel="noopener noreferrer">mycolor.space</a> was particularly helpful. The decision wasn\'t easy, but I\'m happy with it now.',
      about_light_mode: "Light Mode",
      about_primary_color: "Primary Color",
      about_accent_color: "Accent Color",
      about_dark_mode_label: "Dark Mode",
      about_canva_heading: "Image Editing",
      about_canva_p1: "I used Canva for image editing. Canva is simple and does pretty much everything I need.",
      about_bootstrap_heading: "Bootstrap as a Front-End Framework",
      about_bootstrap_text:
        'I use <a href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer">Bootstrap</a> for my site, just like 19% of all websites do. Bootstrap offers many design templates for buttons, the navigation bar, dark mode, and much more.',
      about_dark_mode_screenshot: "Site in Dark Mode",
      about_canva_work_title: "Working with Canva",
      about_hover_heading: "Hover.css",
      about_hover_text:
        'For the shrink and grow animations I used <a href="https://github.com/IanLunn/Hover" target="_blank" rel="noopener noreferrer">Hover.css by Ian Lunn</a>. I like the shrink animation so much that I\'ve used it almost everywhere.',
      about_modal_dark_mode_title: "Site in Dark Mode",
      about_modal_dark_mode_caption: "Feel free to switch to dark mode and admire the site all over again.",
      about_modal_canva_title: "Working with Canva",
      about_modal_canva_caption: "I conjured up this image to demonstrate my graphic design skills.",
      // Imprint
      imprint_title: "Imprint",
      imprint_contact_heading: "Contact",
      imprint_privacy_title: "Privacy Policy",
      imprint_date: "As of: 31 December 2024",
      imprint_controller_h: "Person in charge",
      imprint_controller_address: "Özgün Cakir<br />Schumannstr. 20<br />40237 Düsseldorf, Germany",
      imprint_email_line: 'Email address: <a href="mailto:oezguen.cakir@posteo.de">oezguen.cakir@posteo.de</a>',
      imprint_hosting_h: "Hosting",
      imprint_hosting_intro:
        "My hosting provider collects the following data in so-called log files, which your browser transmits:",
      imprint_li_ip: "IP address,",
      imprint_li_referer: "the address of the previously visited website (Referer request header),",
      imprint_li_datetime: "date and time of the request,",
      imprint_li_timezone: "time zone difference to Greenwich Mean Time,",
      imprint_li_content: "content of the request,",
      imprint_li_status: "HTTP status code,",
      imprint_li_data_amount: "amount of data transferred,",
      imprint_li_browser: "and information about browser and operating system.",
      imprint_hosting_p1:
        "This is necessary to display the website and to ensure its stability and security.<br />This corresponds to my legitimate interest within the meaning of Art. 6 para. 1 s. 1 lit. f GDPR.",
      imprint_hosting_p2: "No tracking takes place and I have no direct access to this data.",
      imprint_hosting_p3: "I use the following hosting provider to make this website available:",
      imprint_hosting_p4:
        "This entity is the recipient of your personal data. This corresponds to my legitimate interest within the meaning of Art. 6 para. 1 s. 1 lit. f GDPR in not having to operate a server on my own premises. Server location is the USA.",
      imprint_hosting_p5: "Further information on options to object and for removal against GitHub can be found at:",
      imprint_hosting_p6:
        "You have the right to object to the processing. Whether the objection is successful is to be determined through a balancing of interests.",
      imprint_hosting_p7: "The data will be deleted once the purpose of the processing no longer applies.",
      imprint_hosting_p8:
        "The processing of the data specified in this section is neither legally nor contractually required. The functionality of the website cannot be guaranteed without this processing.",
      imprint_hosting_p9:
        "GitHub has implemented compliance measures for international data transfers. These apply to all global activities in which GitHub processes personal data of natural persons in the EU. These measures are based on the EU Standard Contractual Clauses (SCCs). Further information can be found at:",
      imprint_legal_h: "Legal Notes",
      imprint_legal_p1_pre:
        'In general, a data processing agreement must be concluded with the hosting provider. The Bavarian State Office for Data Protection Supervision has made an exception for the hosting of purely static websites. In cases where the website serves self-presentation purposes, e.g. for associations or small businesses, no personal data flows to the operator, and no tracking takes place, there is no data processing on behalf. It further states: "The fact that IP addresses, i.e. personal data, must inevitably be processed when hosting static websites does not lead to the assumption of data processing on behalf. That would not be appropriate. The (short-term) storage of IP addresses is rather still attributable to the telecommunications access mediation of the website host under the TKG and primarily serves security purposes of the host."',
      imprint_legal_p1_post: "I assume that this exception applies to GitHub Pages.",
      imprint_source: "Source:",
    },
  };

  const applyLanguage = (lang) => {
    document.documentElement.setAttribute("lang", lang);

    // Einfache Texte
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[lang]?.[key] !== undefined) el.textContent = t[lang][key];
    });

    // Texte mit HTML-Inhalt (Links, <code>, <br> etc.)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (t[lang]?.[key] !== undefined) el.innerHTML = t[lang][key];
    });

    // Typewriter-Text aktualisieren und neu starten
    const typewriter = document.querySelector(".typewrite-once");
    if (typewriter && t[lang]?.contact_summary_text) {
      typewriter.setAttribute("data-text", t[lang].contact_summary_text);
      typewriter.textContent = "";
      if (typeof startTypewriterOnce === "function") startTypewriterOnce(typewriter);
    }

    // Chart-Tooltip sprachabhängig aktualisieren
    if (typeof window.updateChartLang === "function") window.updateChartLang(lang);

    // Datumsdifferenz sprachabhängig neu berechnen
    const ddEl = document.getElementById("dateDifference");
    if (ddEl) ddEl.textContent = dateDiff("2022-07-01", lang);
    const yeEl = document.getElementById("years_experience");
    if (yeEl) yeEl.textContent = dateDiff("2022-07-01", lang);

    // Toggle-Button beschriften (nur Span, nicht Icon überschreiben)
    const btn = document.querySelector("#language-toggle");
    if (btn) {
      const span = btn.querySelector("span");
      if (span) span.textContent = lang === "de" ? "EN" : "DE";
      const label = lang === "de" ? "Switch to English" : "Zu Deutsch wechseln";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    }
  };

  // lang-Attribut sofort setzen (vor DOMContentLoaded, um Flash zu vermeiden)
  document.documentElement.setAttribute("lang", getPreferredLang());

  window.addEventListener("DOMContentLoaded", () => {
    applyLanguage(getPreferredLang());

    const btn = document.querySelector("#language-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const current = getStoredLang() || "de";
        const next = current === "de" ? "en" : "de";
        setStoredLang(next);
        applyLanguage(next);
      });
    }
  });
})();
