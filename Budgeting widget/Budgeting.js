// Colori
let greenColor = new Color("#2a9d8f")
let redColor = new Color("#e63948")
let blueColor = new Color("#467b9d")
let headercolor = Color.dynamic(new Color("#343946"), Color.white())
let testicolor = Color.dynamic(new Color("#6e7276"), new Color("#ebebeb"))
function colorBG() {
	let darkC = new Color("#191919")
	let lightC = new Color("#fafafa")
	return Color.dynamic(lightC, darkC)}

// Font
let testifont = new Font("Helvetica Bold", 13.5)
let cifrefont = new Font("Helvetica Bold", 22)

//Stuff
let currency = "€"
let thousands = "k"

// Widget
let widget = await createWidget();
Script.setWidget(widget);

async function createWidget() {
	let w = new ListWidget()
	w.backgroundColor = colorBG()
	w.respectScreenScale = true

	// Auto refresh, not sure if it really works  
	var refreshDate = Date.now() + 1000*60*3 // 3 minutes
	w.refreshAfterDate = new Date(refreshDate)

		// Replace the Sheet ID	
		const endpoint = "https://spreadsheets.google.com/feeds/cells/YOUR_SHEET_ID/1/public/full?alt=json"

		// Function that performs the request to the JSON endpoint
		async function loadItems() {
 		let at = endpoint
 		let req = new Request(at)
 		let corpo = await req.loadJSON()
 		// We return just the cells
 		return corpo.feed.entry
		}
		// Request the spreadsheet data
		let json = await loadItems()

		// Contents of the cells i need with some extra formatting; change the value inside [] to return different cells
		let entrat = json[222].content["$t"]; let ent = entrat.slice(3,-4); let entrate = ent + currency;
		let uscit = json[221].content["$t"]; let usc = uscit.slice(3,-4); let uscite = usc + currency;
		let util = json[223].content["$t"]; let uti = util.slice(3,-4); let utile = uti + currency;
		let sostentament = json[224].content["$t"]; let sos = sostentament.slice(3,-4); let sostentamento = sos + currency;
		let investiment = json[225].content["$t"]; let inv = investiment.slice(3,-4); let investimenti = inv + currency;
		let caseee = json[226].content["$t"]; let cas = caseee.slice(3,-4); let casee = cas + currency;
		let bollett = json[209].content["$t"]; let bol = bollett.slice(3,-4); let bollette = bol + currency;
		let abbonament = json[210].content["$t"]; let abb = abbonament.slice(3,-4); let abbonamenti = abb + currency;
		let intratteniment = json[211].content["$t"]; let int = intratteniment.slice(3,-4); let intrattenimento = int + currency;
		let ciboo = json[212].content["$t"]; let cib = ciboo.slice(3,-4); let cibo = cib + currency;
		let spes = json[213].content["$t"]; let spe = spes.slice(3,-4); let spesa = spe + currency;
		let salut = json[214].content["$t"]; let sal = salut.slice(3,-4); let salute = sal + currency;
		let shoppin = json[215].content["$t"]; let sho = shoppin.slice(3,-4); let shopping = sho + currency;
		let autoo = json[216].content["$t"]; let aut = autoo.slice(3,-4); let auto = aut + currency;
		let viagg = json[217].content["$t"]; let via = viagg.slice(3,-4); let viaggi = via + currency;
		let lavor = json[218].content["$t"]; let lav = lavor.slice(3,-4); let lavoro = lav + currency;
		let regal = json[219].content["$t"]; let reg = regal.slice(3,-4); let regali = reg + currency;
		let altr = json[220].content["$t"]; let alt = altr.slice(3,-4); let altro = alt + currency;

		// Doing some magic to show "k" instead of the full number if it surpasses 100.000€ to maintain the beatiful layout
		function entrateK() {
  				if (ent.replace(".","")>=100000) {
    				return ent.slice(0, -4) + thousands + currency;}
    			else {
      				return entrate;}}

		function usciteK() {
  				if (usc.replace(".","")>=100000) {
    				return usc.slice(0, -4) + thousands + currency;}
    			else {
      				return uscite;}}

		function utileK() {
  				if (uti.replace(".","")>=100000) {
    				return uti.slice(0, -4) + thousands + currency;}
            else if (uti.replace(".","")<=-100000) {
               return uti.slice(0, -4) + thousands + currency;}
    			else {
      				return utile;}}
      
      let contacaratteri = entrateK().length + usciteK().length + utileK().length

		// Function to regulate the spacing of the s1 stack based on the lenght of the numbers
		function spacingcifre() {
  				if (contacaratteri<18) {
  					return 35;}
				else if (18<=contacaratteri<21) {
  					return 17;}
				else {
  					return 5;}}

		// Doing some magic to show "k" instead of the full number if it surpasses 10.000€ or "-" if there's no data to maintain the layout
		function sostentamentoK() {
  				if (sos<1) {
    				return "-";}
    			else {
      				return sostentamento;}}

  		function investimentiK() {
  				if (inv<1) {
    				return "-";}
    			else {
      				return investimenti;}}
      
		function caseeK() {
  				if (cas<1) {
    				return "-";}
    			else {
      				return casee;}}
  
  		function bolletteK() {
  				if (bol<1) {
    				return "-";}
            else if (bol.replace(".","")>=10000) {
                return bol.slice(0, -4) + thousands + currency;;} 
    			else {
      				return bollette;}}

		function abbonamentiK() {
  				if (abb<1) {
    				return "-";}
            else if (abb.replace(".","")>=10000) {
                return abb.slice(0, -4) + thousands + currency;;} 
    			else {
      				return abbonamenti;}}

		function intrattenimentoK() {
  				if (int<1) {
    				return "-";}
            else if (int.replace(".","")>=10000) {
                return int.slice(0, -4) + thousands + currency;;} 
    			else {
      				return intrattenimento;}}

		function ciboK() {
  				if (cib<1) {
    				return "-";}
            else if (cib.replace(".","")>=10000) {
                return cib.slice(0, -4) + thousands + currency;;} 
    			else {
      				return cibo;}}

		function spesaK() {
  				if (spe<1) {
    				return "-";}
            else if (spe.replace(".","")>=10000) {
                return spe.slice(0, -4) + thousands + currency;;} 
    			else {
      				return spesa;}}

		function saluteK() {
  				if (sal<1) {
    				return "-";}
            else if (sal.replace(".","")>=10000) {
                return sal.slice(0, -4) + thousands + currency;;} 
    			else {
      				return salute;}}

		function shoppingK() {
  				if (sho<1) {
    				return "-";}
            else if (sho.replace(".","")>=10000) {
                return sho.slice(0, -4) + thousands + currency;;} 
    			else {
      				return shopping;}}

		function autoK() {
  				if (aut<1) {
    				return "-";}
            else if (aut.replace(".","")>=10000) {
                return aut.slice(0, -4) + thousands + currency;;} 
    			else {
      				return auto;}}

		function viaggiK() {
  				if (via<1) {
    				return "-";}
            else if (via.replace(".","")>=10000) {
                return via.slice(0, -4) + thousands + currency;;} 
    			else {
      				return viaggi;}}

		function lavoroK() {
  				if (lav<1) {
    				return "-";}
            else if (lav.replace(".","")>=10000) {
                return lav.slice(0, -4) + thousands + currency;;} 
    			else {
      				return lavoro;}}

		function regaliK() {
  				if (reg<1) {
    				return "-";}
            else if (reg.replace(".","")>=10000) {
                return reg.slice(0, -4) + thousands + currency;;} 
    			else {
      				return regali;}}

		function altroK() {
  				if (alt<1) {
    				return "-";}
            else if (alt.replace(".","")>=10000) {
                return alt.slice(0, -4) + thousands + currency;;} 
    			else {
      				return altro;}}

			// Header
			const headerStack = w.addStack()
			titleTxt = headerStack.addText("BUDGETING")
			titleTxt.textColor = headercolor
			titleTxt.font = new Font("Helvetica Bold", 23)
			headerStack.setPadding(10, 5, 0, 0)

			w.addSpacer(15)

			// Cifre stack (s1)
			const s1 = w.addStack()
			s1.layoutHorizontally()
			s1.centerAlignContent()
			s1.spacing = spacingcifre()
			s1.setPadding(0, 5, 0, 5)
 			s1data1 = s1.addText(entrateK()) // entrate
			s1data1.font = cifrefont
			s1data1.textColor = greenColor
			s1data1.lineLimit = 1
			s1data2 = s1.addText(usciteK()) // uscite
			s1data2.font = cifrefont
			s1data2.textColor = redColor
			s1data2.lineLimit = 1
			s1data3 = s1.addText(utileK()) // utile
			s1data3.font = cifrefont
			s1data3.textColor = blueColor
			s1data3.lineLimit = 1

			w.addSpacer(15)

			// Entrate label
			const label1 = w.addStack()
			label1data = label1.addText("ENTRATE")
			label1data.font = testifont
			label1data.textColor = greenColor
			label1.setPadding(0, 19, 0, 0)
	
			w.addSpacer(7)

			// Entrate Stack (entrateStack)(stack composta da due stack)
			const entrateStack = w.addStack()
			entrateStack.layoutHorizontally()
			// green rectangle
			let spacer = entrateStack.addStack()
			spacer.backgroundColor = greenColor
			spacer.addText(" ")
			spacer.size = new Size (0,51)
			entrateStack.spacing = 10
			entrateStack.setPadding(0, 5, 0, 0)

			w.addSpacer(15)

			// Categorie entrate (s2 stack layout verticale)
			const s2 = entrateStack.addStack()
			s2.layoutVertically()
			s2.spacing = 1
			s2data1 = s2.addText("Sostentamento") // label category income
			s2data1.textColor = testicolor
			s2data1.font = testifont
			s2data2 = s2.addText("Investimenti") // label category income
			s2data2.textColor = testicolor
			s2data2.font = testifont
			s2data3 = s2.addText("Case") // label category income
			s2data3.textColor = testicolor
			s2data3.font = testifont

			// Cifre entrate (s3 stack layout verticale)
			const s3 = entrateStack.addStack()
			s3.layoutVertically()
			s3.spacing = 1
 			s3data1 = s3.addText(sostentamentoK())
			s3data1.textColor = testicolor
			s3data1.font = testifont
			s3data2 = s3.addText(investimentiK())
			s3data2.textColor = testicolor
			s3data2.font = testifont
			s3data3 = s3.addText(caseeK())
			s3data3.textColor = testicolor
			s3data3.font = testifont
	
			// Uscite label
			const label2 = w.addStack()
			label2data = label2.addText("USCITE")
			label2data.font = testifont
			label2data.textColor = redColor
			label2.setPadding(0, 19, 0, 0)
			
			w.addSpacer(7)

			// Uscite Stack (usciteStack)(stack composta da quattro stack)
			const usciteStack = w.addStack()
			usciteStack.layoutHorizontally()
			// red rectangle
			let spacer2 = usciteStack.addStack()
			spacer2.backgroundColor = redColor
			spacer2.addText(" ")
			spacer2.size = new Size (0,104)
			usciteStack.spacing = 10
			usciteStack.setPadding(0, 5, 0, 5)

			w.addSpacer(0)

			// Categorie uscite (s4 stack layout verticale)
			const s4 = usciteStack.addStack()
			s4.layoutVertically()
			s4.spacing = 1
			s4data1 = s4.addText("Bollette") // label category expenses
			s4data1.textColor = testicolor
			s4data1.font = testifont
			s4data2 = s4.addText("Abbonamenti") // label category expenses
			s4data2.textColor = testicolor
			s4data2.font = testifont
			s4data3 = s4.addText("Intrattenimento") // label category expenses
			s4data3.textColor = testicolor
			s4data3.font = testifont
			s4data4 = s4.addText("Cibo/bevande") // label category expenses
			s4data4.textColor = testicolor
			s4data4.font = testifont
			s4data5 = s4.addText("Spesa") // label category expenses
			s4data5.textColor = testicolor
			s4data5.font = testifont
			s4data6 = s4.addText("Salute") // label category expenses
			s4data6.textColor = testicolor
			s4data6.font = testifont

			// Cifre uscite (s5 stack layout verticale)
			const s5 = usciteStack.addStack()
			s5.layoutVertically()
			s5.spacing = 1
 			s5data1 = s5.addText(bolletteK())
			s5data1.textColor = testicolor
			s5data1.font = testifont
			s5data2 = s5.addText(abbonamentiK())
			s5data2.textColor = testicolor
			s5data2.font = testifont
			s5data3 = s5.addText(intrattenimentoK())
			s5data3.textColor = testicolor
			s5data3.font = testifont
 			s5data4 = s5.addText(ciboK())
			s5data4.textColor = testicolor
			s5data4.font = testifont
			s5data5 = s5.addText(spesaK())
			s5data5.textColor = testicolor
			s5data5.font = testifont
			s5data6 = s5.addText(saluteK())
			s5data6.textColor = testicolor
			s5data6.font = testifont

			// Categorie uscite (s6 stack layout verticale)
			const s6 = usciteStack.addStack()
			s6.layoutVertically()
			s6.spacing = 1
			s6data1 = s6.addText("Shopping") // label category expenses
			s6data1.textColor = testicolor
			s6data1.font = testifont
			s6data2 = s6.addText("Auto") // label category expenses
			s6data2.textColor = testicolor
			s6data2.font = testifont
			s6data3 = s6.addText("Viaggi") // label category expenses
			s6data3.textColor = testicolor
			s6data3.font = testifont
			s6data4 = s6.addText("Lavoro") // label category expenses
			s6data4.textColor = testicolor
			s6data4.font = testifont
			s6data5 = s6.addText("Regali") // label category expenses
			s6data5.textColor = testicolor
			s6data5.font = testifont
			s6data6 = s6.addText("Altro") // label category expenses
			s6data6.textColor = testicolor
			s6data6.font = testifont

			// Cifre uscite (s7 stack layout verticale)
			const s7 = usciteStack.addStack()
			s7.layoutVertically()
			s7.spacing = 1
 			s7data1 = s7.addText(shoppingK())
			s7data1.textColor = testicolor
			s7data1.font = testifont
			s7data2 = s7.addText(autoK())
			s7data2.textColor = testicolor
			s7data2.font = testifont
			s7data3 = s7.addText(viaggiK())
			s7data3.textColor = testicolor
			s7data3.font = testifont
 			s7data4 = s7.addText(lavoroK())
			s7data4.textColor = testicolor
			s7data4.font = testifont
			s7data5 = s7.addText(regaliK())
			s7data5.textColor = testicolor
			s7data5.font = testifont
			s7data6 = s7.addText(altroK())
			s7data6.textColor = testicolor
			s7data6.font = testifont

		w.addSpacer(7)

		
	// Widget last update
	const l1 = w.addStack()
	l1.layoutHorizontally()
	l1.centerAlignContent()
	l1.setPadding(0, 0, -8, 0)
	
	var today = new Date()
	var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
	let refreshLabel = w.addText("Last updated: " + date+","+new Date().toLocaleTimeString())
	refreshLabel.textColor = Color.dynamic(new Color("#1d1d1b"), Color.white())
	refreshLabel.textOpacity = 0.9
	refreshLabel.font = new Font("Helvetica Light", 7)
	refreshLabel.centerAlignText()
	
	return w
}

// You can remove this last line, it's mainly for debugging porpuses
widget.presentLarge()
