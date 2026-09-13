#!/usr/bin/env python3
"""Generate sample thesis PDF documents for the Samples section."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
)

OUTPUT_DIR = "/home/z/my-project/public/samples"
os.makedirs(OUTPUT_DIR, exist_ok=True)

PRIMARY = HexColor("#0e7a5b")
ACCENT = HexColor("#d4a017")
DARK = HexColor("#1a3a32")
MUTED = HexColor("#666666")
LIGHT_BG = HexColor("#f8faf9")

def add_page_number(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(MUTED)
    page_num = canvas.getPageNumber()
    canvas.drawCentredString(A4[0] / 2, 1.5 * cm, f"Page {page_num}")
    canvas.drawString(2 * cm, 1.5 * cm, "Thesis Writing Service PK — Sample Document")
    canvas.drawRightString(A4[0] - 2 * cm, 1.5 * cm, "Confidential")
    canvas.restoreState()

def create_styles():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='TitleCustom', fontSize=20, leading=26, alignment=TA_CENTER,
                              textColor=DARK, spaceAfter=6, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='Subtitle', fontSize=12, leading=16, alignment=TA_CENTER,
                              textColor=PRIMARY, spaceAfter=20, fontName='Helvetica'))
    styles.add(ParagraphStyle(name='H1Custom', fontSize=15, leading=20, textColor=PRIMARY,
                              spaceBefore=20, spaceAfter=10, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='H2Custom', fontSize=12, leading=16, textColor=DARK,
                              spaceBefore=14, spaceAfter=6, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='Body', fontSize=10.5, leading=16, alignment=TA_JUSTIFY,
                              textColor=DARK, spaceAfter=8, fontName='Helvetica',
                              firstLineIndent=18))
    styles.add(ParagraphStyle(name='BodyNoIndent', fontSize=10.5, leading=16, alignment=TA_JUSTIFY,
                              textColor=DARK, spaceAfter=8, fontName='Helvetica'))
    styles.add(ParagraphStyle(name='Meta', fontSize=9, leading=13, textColor=MUTED,
                              fontName='Helvetica-Oblique'))
    return styles

def make_cover_page(story, styles, title, discipline, level, fmt, pages):
    story.append(Spacer(1, 4 * cm))
    story.append(Paragraph("THESIS WRITING SERVICE PK", ParagraphStyle(
        'CoverBrand', fontSize=11, leading=14, alignment=TA_CENTER,
        textColor=ACCENT, fontName='Helvetica-Bold', spaceAfter=30)))
    story.append(Paragraph(title, styles['TitleCustom']))
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph(f"Discipline: {discipline}", styles['Subtitle']))
    story.append(Spacer(1, 1 * cm))
    
    meta_data = [
        ["Academic Level", level],
        ["Document Type", "Thesis"],
        ["Total Pages", str(pages)],
        ["Format", fmt],
        ["Status", "Sample — For Review Only"],
    ]
    meta_table = Table(meta_data, colWidths=[5 * cm, 7 * cm])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), PRIMARY),
        ('TEXTCOLOR', (0, 0), (0, -1), HexColor("#ffffff")),
        ('BACKGROUND', (1, 0), (1, -1), LIGHT_BG),
        ('TEXTCOLOR', (1, 0), (1, -1), DARK),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (1, 0), (1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('LINEBELOW', (0, 0), (-1, -1), 0.5, HexColor("#e0e0e0")),
        ('BOX', (0, 0), (-1, -1), 1, PRIMARY),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 2 * cm))
    story.append(Paragraph(
        "This is a sample document provided by Thesis Writing Service PK for review purposes. "
        "It demonstrates our writing quality, formatting standards, and academic rigor. "
        "All content is original and plagiarism-free.",
        styles['Meta']
    ))
    story.append(PageBreak())

def generate_emotional_marketing():
    styles = create_styles()
    path = os.path.join(OUTPUT_DIR, "sample-emotional-marketing.pdf")
    doc = SimpleDocTemplate(path, pagesize=A4, topMargin=2.5*cm, bottomMargin=2.5*cm,
                            leftMargin=2.5*cm, rightMargin=2.5*cm,
                            title="Emotional Marketing — Thesis Sample",
                            author="Thesis Writing Service PK",
                            subject="Sample Thesis Document")
    story = []
    make_cover_page(story, styles, "Emotional Marketing: The Role of Consumer Emotions in Purchase Decisions",
                    "Marketing", "Master's", "APA", 30)
    
    story.append(Paragraph("Abstract", styles['H1Custom']))
    story.append(Paragraph(
        "This study examines the influence of emotional marketing strategies on consumer purchase decisions "
        "in the digital age. Through a mixed-methods approach combining survey data from 450 respondents and "
        "qualitative interviews with 20 marketing professionals, this research identifies the key emotional "
        "triggers that drive consumer behavior. The findings reveal that emotionally resonant content increases "
        "purchase intent by 47% compared to purely informational content, with nostalgia, joy, and trust emerging "
        "as the most effective emotional drivers. The study contributes to the broader understanding of affective "
        "marketing and provides actionable recommendations for practitioners seeking to optimize their campaigns.",
        styles['BodyNoIndent']
    ))
    story.append(Spacer(1, 0.5 * cm))
    
    story.append(Paragraph("Chapter 1: Introduction", styles['H1Custom']))
    story.append(Paragraph(
        "The contemporary marketing landscape has undergone a profound transformation in recent years, shifting "
        "from product-centric approaches toward consumer-centric paradigms that prioritize emotional engagement. "
        "This evolution reflects a fundamental recognition that consumer decisions are rarely purely rational; "
        "they are deeply influenced by emotional responses that operate both consciously and subconsciously. "
        "Understanding these emotional dimensions has become critical for marketers seeking to build lasting "
        "brand relationships in an increasingly competitive marketplace.", styles['Body']
    ))
    story.append(Paragraph(
        "Emotional marketing refers to the strategic use of emotional appeals in promotional content to create "
        "connections between brands and consumers. Research in consumer psychology has consistently demonstrated "
        "that emotional responses to advertising are stronger predictors of purchase behavior than rational "
        "evaluations of product attributes. This finding has prompted organizations across industries to invest "
        "substantially in understanding and leveraging consumer emotions.", styles['Body']
    ))
    story.append(Paragraph(
        "The digital revolution has further amplified the importance of emotional marketing. Social media "
        "platforms, with their emphasis on shareable, emotionally resonant content, have created an environment "
        "where emotional engagement drives visibility and reach. Brands that successfully tap into consumer "
        "emotions can achieve organic amplification that far exceeds the reach of traditional advertising methods.",
        styles['Body']
    ))
    
    story.append(Paragraph("1.1 Research Objectives", styles['H2Custom']))
    story.append(Paragraph(
        "This study seeks to achieve the following research objectives: first, to identify the primary emotional "
        "triggers that influence consumer purchase decisions in digital marketing contexts; second, to measure "
        "the relative effectiveness of different emotional appeals across demographic segments; and third, to "
        "examine the relationship between emotional engagement and brand loyalty.", styles['Body']
    ))
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 2: Literature Review", styles['H1Custom']))
    story.append(Paragraph(
        "The theoretical foundation of emotional marketing draws from multiple disciplines including consumer "
        "psychology, behavioral economics, and neuroscience. Damasio's (1994) somatic marker hypothesis "
        "established that emotions play a crucial role in decision-making, challenging the traditional view that "
        "rational deliberation drives consumer choice. This seminal work opened the door for extensive research "
        "into the affective dimensions of consumer behavior.", styles['Body']
    ))
    story.append(Paragraph(
        "Subsequent research by Kotler and Keller (2016) categorized marketing appeals into functional, "
        "emotional, and self-expressive benefits, providing a framework that has guided both academic inquiry "
        "and practical application. Their model suggests that emotional benefits—feelings generated by the "
        "brand experience—are particularly powerful in differentiating products in saturated markets.",
        styles['Body']
    ))
    
    story.append(Paragraph("2.1 Theoretical Frameworks", styles['H2Custom']))
    story.append(Paragraph(
        "Several theoretical frameworks inform the study of emotional marketing. The Elaboration Likelihood "
        "Model (Petty and Cacioppo, 1986) proposes that persuasion occurs through two routes: central and "
        "peripheral. Emotional appeals typically operate through the peripheral route, influencing attitudes "
        "without extensive cognitive processing. This is particularly relevant in digital environments where "
        "consumers are exposed to thousands of marketing messages daily and cannot deeply process each one.",
        styles['Body']
    ))
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 3: Methodology", styles['H1Custom']))
    story.append(Paragraph(
        "This study employs a mixed-methods research design to provide a comprehensive understanding of "
        "emotional marketing effectiveness. The quantitative component consists of a structured online survey "
        "administered to 450 respondents across three major cities in Pakistan. The qualitative component "
        "includes in-depth interviews with 20 marketing professionals to gain deeper insights into strategic "
        "considerations and practical implementations.", styles['Body']
    ))
    
    story.append(Paragraph("3.1 Data Collection", styles['H2Custom']))
    story.append(Paragraph(
        "Quantitative data was collected through a self-administered questionnaire distributed via online "
        "platforms. The instrument measured emotional responses to marketing stimuli using a five-point Likert "
        "scale, covering dimensions including joy, trust, fear, nostalgia, and surprise. Demographic variables "
        "including age, gender, education level, and income were also captured to enable segment analysis.",
        styles['Body']
    ))
    
    story.append(Paragraph("3.2 Sample Profile", styles['H2Custom']))
    table_data = [
        ["Demographic", "Category", "Count", "Percentage"],
        ["Gender", "Male", "234", "52.0%"],
        ["", "Female", "216", "48.0%"],
        ["Age Group", "18-25", "156", "34.7%"],
        ["", "26-35", "168", "37.3%"],
        ["", "36-45", "89", "19.8%"],
        ["", "46+", "37", "8.2%"],
        ["Education", "Undergraduate", "201", "44.7%"],
        ["", "Graduate", "168", "37.3%"],
        ["", "Postgraduate", "81", "18.0%"],
    ]
    table = Table(table_data, colWidths=[3.5*cm, 4*cm, 2.5*cm, 3*cm])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor("#ffffff")),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (2, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor("#ffffff"), LIGHT_BG]),
        ('BOX', (0, 0), (-1, -1), 0.5, HexColor("#cccccc")),
        ('INNERGRID', (0, 0), (-1, -1), 0.25, HexColor("#e0e0e0")),
    ]))
    story.append(table)
    story.append(Spacer(1, 0.3 * cm))
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 4: Results and Discussion", styles['H1Custom']))
    story.append(Paragraph(
        "The analysis of survey data revealed compelling patterns in consumer emotional responses to marketing "
        "content. Among the five emotional dimensions measured, joy emerged as the strongest predictor of "
        "purchase intent (r = 0.67, p < 0.001), followed by trust (r = 0.58, p < 0.001) and nostalgia "
        "(r = 0.52, p < 0.001). These findings align with prior research suggesting that positive emotions "
        "are more effective drivers of consumer behavior than negative emotions in most product categories.",
        styles['Body']
    ))
    story.append(Paragraph(
        "Importantly, the study found that emotionally resonant content increased purchase intent by 47% "
        "compared to purely informational content. This effect was particularly pronounced among younger "
        "consumers (18-35 age group), who showed a 62% increase in purchase intent when exposed to "
        "emotionally engaging marketing materials.", styles['Body']
    ))
    
    story.append(Paragraph("Chapter 5: Conclusion", styles['H1Custom']))
    story.append(Paragraph(
        "This study demonstrates the significant role that emotional marketing plays in shaping consumer "
        "purchase decisions. The findings provide empirical support for the strategic emphasis on emotional "
        "engagement in contemporary marketing practice. For practitioners, the results suggest that "
        "investing in emotionally resonant content creation yields measurable returns in terms of purchase "
        "intent and brand loyalty. Future research should explore the longitudinal effects of emotional "
        "marketing on brand relationships and examine cross-cultural variations in emotional responsiveness.",
        styles['Body']
    ))
    story.append(Spacer(1, 1 * cm))
    story.append(Paragraph("— End of Sample —", styles['Meta']))
    
    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    return path

def generate_flight_security():
    styles = create_styles()
    path = os.path.join(OUTPUT_DIR, "sample-flight-security.pdf")
    doc = SimpleDocTemplate(path, pagesize=A4, topMargin=2.5*cm, bottomMargin=2.5*cm,
                            leftMargin=2.5*cm, rightMargin=2.5*cm,
                            title="Aviation Security — Thesis Sample",
                            author="Thesis Writing Service PK",
                            subject="Sample Thesis Document")
    story = []
    make_cover_page(story, styles, "Aviation Security Protocols: Evaluating the Effectiveness of Modern Screening Technologies",
                    "Aviation Security", "Undergraduate", "APA", 32)
    
    story.append(Paragraph("Abstract", styles['H1Custom']))
    story.append(Paragraph(
        "This undergraduate thesis evaluates the effectiveness of modern airport security screening technologies "
        "in detecting potential threats. Through a comprehensive review of existing literature and analysis of "
        "publicly available security data, this study assesses the strengths and limitations of current screening "
        "methods including advanced imaging technology, explosive detection systems, and biometric identification. "
        "The findings suggest that while modern technologies have significantly improved detection rates, "
        "challenges remain in balancing security effectiveness with passenger throughput and privacy concerns.",
        styles['BodyNoIndent']
    ))
    story.append(Spacer(1, 0.5 * cm))
    
    story.append(Paragraph("Chapter 1: Introduction", styles['H1Custom']))
    story.append(Paragraph(
        "Aviation security represents one of the most critical components of the global transportation infrastructure. "
        "The events of September 11, 2001 fundamentally transformed the approach to aviation security worldwide, "
        "leading to substantial investments in screening technologies, personnel training, and regulatory frameworks. "
        "In the two decades since, the aviation industry has witnessed continuous evolution in both the threats "
        "faced and the technologies deployed to counter them.", styles['Body']
    ))
    story.append(Paragraph(
        "Modern airports employ a multi-layered security approach that integrates physical screening, behavioral "
        "analysis, and technological detection systems. The effectiveness of these measures directly impacts not "
        "only passenger safety but also the operational efficiency of airports and the broader economic activity "
        "that depends on air travel. Understanding the strengths and limitations of current security technologies "
        "is therefore essential for both academic inquiry and practical policy development.", styles['Body']
    ))
    
    story.append(Paragraph("1.1 Research Questions", styles['H2Custom']))
    story.append(Paragraph(
        "This study addresses three primary research questions: What are the most effective screening technologies "
        "currently deployed in aviation security? How do these technologies compare in terms of detection accuracy "
        "and passenger processing efficiency? What are the key challenges and future directions in aviation "
        "security screening?", styles['Body']
    ))
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 2: Literature Review", styles['H1Custom']))
    story.append(Paragraph(
        "The academic literature on aviation security spans multiple disciplines including transportation "
        "engineering, public policy, and human factors psychology. Early research focused primarily on the "
        "technical capabilities of screening equipment, while more recent work has adopted a systems perspective "
        "that considers the interaction between technology, human operators, and organizational procedures.",
        styles['Body']
    ))
    story.append(Paragraph(
        "Stewart and Mueller (2013) conducted a comprehensive cost-benefit analysis of aviation security measures, "
        "finding that the annual cost of security screening in the United States exceeds $5 billion, while the "
        "risk reduction achieved is difficult to quantify precisely. Their work highlights the challenge of "
        "evaluating security investments in an environment where successful attacks are rare but potentially "
        "catastrophic.", styles['Body']
    ))
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 3: Methodology", styles['H1Custom']))
    story.append(Paragraph(
        "This study employs a qualitative research methodology based on a systematic review of existing literature "
        "and analysis of publicly available security data from aviation authorities. The review covers peer-reviewed "
        "academic publications, government reports, and industry white papers published between 2010 and 2024. "
        "This approach enables a comprehensive assessment of the current state of aviation security technology "
        "without the ethical and logistical challenges of primary data collection in a security-sensitive context.",
        styles['Body']
    ))
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 4: Findings", styles['H1Custom']))
    story.append(Paragraph(
        "The analysis identified several key findings regarding modern aviation security technologies. Advanced "
        "Imaging Technology (AIT) systems, commonly known as body scanners, have achieved detection rates exceeding "
        "95% for metallic threats and 87% for non-metallic threats. However, concerns about privacy and the "
        "potential for false positives have led to ongoing debates about their appropriate use.", styles['Body']
    ))
    story.append(Paragraph(
        "Explosive Detection Systems (EDS) have similarly improved, with modern systems capable of detecting "
        "trace amounts of explosive materials in baggage with high accuracy. The integration of artificial "
        "intelligence into these systems has further enhanced their capability to identify novel threats that "
        "may not be in existing threat databases.", styles['Body']
    ))
    
    story.append(Paragraph("4.1 Technology Comparison", styles['H2Custom']))
    compare_data = [
        ["Technology", "Detection Rate", "Processing Time", "Cost Range"],
        ["Advanced Imaging (AIT)", "95%", "8-12 sec/passenger", "$150K-$200K"],
        ["Explosive Detection (EDS)", "93%", "5-8 sec/bag", "$250K-$400K"],
        ["Biometric ID", "99%", "2-3 sec/passenger", "$50K-$100K"],
        ["Behavioral Analysis", "70%", "Continuous", "Training costs"],
    ]
    table = Table(compare_data, colWidths=[4*cm, 3*cm, 3.5*cm, 3*cm])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor("#ffffff")),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor("#ffffff"), LIGHT_BG]),
        ('BOX', (0, 0), (-1, -1), 0.5, HexColor("#cccccc")),
        ('INNERGRID', (0, 0), (-1, -1), 0.25, HexColor("#e0e0e0")),
    ]))
    story.append(table)
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 5: Conclusion", styles['H1Custom']))
    story.append(Paragraph(
        "This study has examined the effectiveness of modern aviation security screening technologies, finding "
        "that significant progress has been made in detection capabilities while challenges remain in areas of "
        "privacy, cost, and passenger experience. The findings suggest that a balanced approach integrating "
        "multiple screening methods, supported by well-trained personnel and intelligence-driven risk assessment, "
        "offers the most effective path forward for aviation security. Future research should focus on the "
        "integration of artificial intelligence and the development of privacy-preserving screening methods.",
        styles['Body']
    ))
    story.append(Spacer(1, 1 * cm))
    story.append(Paragraph("— End of Sample —", styles['Meta']))
    
    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    return path

def generate_leadership():
    styles = create_styles()
    path = os.path.join(OUTPUT_DIR, "sample-transactional-leadership.pdf")
    doc = SimpleDocTemplate(path, pagesize=A4, topMargin=2.5*cm, bottomMargin=2.5*cm,
                            leftMargin=2.5*cm, rightMargin=2.5*cm,
                            title="Transactional Leadership — Thesis Sample",
                            author="Thesis Writing Service PK",
                            subject="Sample Thesis Document")
    story = []
    make_cover_page(story, styles, "Transactional Leadership and Organizational Performance: A Study of Pakistan's Corporate Sector",
                    "Leadership", "Master's", "Harvard", 40)
    
    story.append(Paragraph("Abstract", styles['H1Custom']))
    story.append(Paragraph(
        "This master's thesis investigates the relationship between transactional leadership styles and "
        "organizational performance within Pakistan's corporate sector. Drawing on survey data from 320 "
        "employees across 15 organizations, the study examines how transactional leadership behaviors—including "
        "contingent rewards, active management-by-exception, and passive management-by-exception—influence "
        "employee motivation, job satisfaction, and overall organizational outcomes. The findings reveal a "
        "nuanced picture: while contingent rewards positively correlate with performance, excessive reliance "
        "on management-by-exception is associated with reduced employee engagement.",
        styles['BodyNoIndent']
    ))
    story.append(Spacer(1, 0.5 * cm))
    
    story.append(Paragraph("Chapter 1: Introduction", styles['H1Custom']))
    story.append(Paragraph(
        "Leadership remains one of the most studied yet least understood phenomena in organizational behavior. "
        "Among the various leadership frameworks proposed over the past decades, the full-range leadership model "
        "(Avolio and Bass, 1991) has gained particular prominence for its distinction between transformational, "
        "transactional, and laissez-faire leadership styles. While transformational leadership has received "
        "extensive scholarly attention, transactional leadership—the more traditional, exchange-based approach—"
        "continues to be widely practiced in organizations worldwide.", styles['Body']
    ))
    story.append(Paragraph(
        "In the context of Pakistan's rapidly evolving corporate landscape, understanding the effectiveness of "
        "different leadership styles is particularly relevant. The country's business environment, characterized "
        "by high power distance, collectivist cultural values, and emerging market dynamics, may present "
        "unique conditions under which transactional leadership operates differently than in Western contexts "
        "where most prior research has been conducted (Hofstede, 2011).", styles['Body']
    ))
    
    story.append(Paragraph("1.1 Research Objectives", styles['H2Custom']))
    story.append(Paragraph(
        "This study aims to: examine the prevalence of transactional leadership behaviors in Pakistani "
        "corporate organizations; measure the relationship between specific transactional leadership dimensions "
        "and employee performance outcomes; and identify contextual factors that moderate the effectiveness "
        "of transactional leadership in the Pakistani setting.", styles['Body']
    ))
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 2: Literature Review", styles['H1Custom']))
    story.append(Paragraph(
        "The concept of transactional leadership is rooted in the exchange theory of leadership, which views "
        "the leader-follower relationship as a process of reciprocal exchange. Burns (1978) first articulated "
        "the distinction between transactional and transformational leadership, arguing that most organizational "
        "leadership operates on a transactional basis where leaders clarify role expectations and provide "
        "rewards contingent on performance.", styles['Body']
    ))
    story.append(Paragraph(
        "Bass (1985) extended this framework, identifying three dimensions of transactional leadership: "
        "contingent reward, active management-by-exception, and passive management-by-exception. Contingent "
        "reward involves explicit agreements about expectations and rewards; active management-by-exception "
        "involves monitoring performance and taking corrective action before problems escalate; passive "
        "management-by-exception involves intervention only after standards have been violated.", styles['Body']
    ))
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 3: Methodology", styles['H1Custom']))
    story.append(Paragraph(
        "This study employed a quantitative survey methodology. Data was collected from 320 employees across "
        "15 organizations in Karachi, Lahore, and Islamabad, representing the banking, telecommunications, "
        "and manufacturing sectors. The Multifactor Leadership Questionnaire (MLQ Form 5X) was used to measure "
        "leadership behaviors, while organizational performance was assessed through self-report measures of "
        "job satisfaction, organizational commitment, and self-rated performance.", styles['Body']
    ))
    
    story.append(Paragraph("3.1 Respondent Profile", styles['H2Custom']))
    profile_data = [
        ["Variable", "Category", "n", "%"],
        ["Gender", "Male", "196", "61.3"],
        ["", "Female", "124", "38.7"],
        ["Age", "Under 30", "128", "40.0"],
        ["", "30-40", "142", "44.4"],
        ["", "Over 40", "50", "15.6"],
        ["Sector", "Banking", "130", "40.6"],
        ["", "Telecommunications", "110", "34.4"],
        ["", "Manufacturing", "80", "25.0"],
    ]
    table = Table(profile_data, colWidths=[3.5*cm, 4*cm, 2.5*cm, 2.5*cm])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('TEXTCOLOR', (0, 0), (-1, 0), HexColor("#ffffff")),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (2, 0), (-1, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor("#ffffff"), LIGHT_BG]),
        ('BOX', (0, 0), (-1, -1), 0.5, HexColor("#cccccc")),
        ('INNERGRID', (0, 0), (-1, -1), 0.25, HexColor("#e0e0e0")),
    ]))
    story.append(table)
    
    story.append(PageBreak())
    story.append(Paragraph("Chapter 4: Results", styles['H1Custom']))
    story.append(Paragraph(
        "Correlation analysis revealed significant relationships between transactional leadership dimensions "
        "and performance outcomes. Contingent reward showed the strongest positive correlation with job "
        "satisfaction (r = 0.54, p < 0.01) and organizational commitment (r = 0.49, p < 0.01). Active "
        "management-by-exception showed a weaker but still positive correlation with performance "
        "(r = 0.31, p < 0.01), while passive management-by-exception showed a negative correlation with "
        "job satisfaction (r = -0.28, p < 0.01).", styles['Body']
    ))
    
    story.append(Paragraph("Chapter 5: Discussion and Conclusion", styles['H1Custom']))
    story.append(Paragraph(
        "The findings of this study contribute to the understanding of transactional leadership in the "
        "Pakistani corporate context. The positive relationship between contingent reward and employee "
        "outcomes aligns with existing literature, suggesting that clear expectations and recognition of "
        "performance remain valued across cultural contexts. However, the negative association of passive "
        "management-by-exception with satisfaction highlights the importance of active leadership engagement. "
        "Organizations should therefore emphasize the constructive dimensions of transactional leadership "
        "while minimizing reliance on passive monitoring approaches.", styles['Body']
    ))
    story.append(Spacer(1, 1 * cm))
    story.append(Paragraph("— End of Sample —", styles['Meta']))
    
    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    return path

if __name__ == "__main__":
    p1 = generate_emotional_marketing()
    print(f"Generated: {p1} ({os.path.getsize(p1)//1024} KB)")
    p2 = generate_flight_security()
    print(f"Generated: {p2} ({os.path.getsize(p2)//1024} KB)")
    p3 = generate_leadership()
    print(f"Generated: {p3} ({os.path.getsize(p3)//1024} KB)")
    print("All sample PDFs generated successfully.")
