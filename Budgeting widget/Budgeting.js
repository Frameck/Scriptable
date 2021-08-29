// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// Code by Frameck (https://github.com/Frameck/Scriptable)
// Budgeting widget large, version 1.3

String.prototype.insert = function(index, string) {
    if (index > 0)
    {
      return this.substring(0, index) + string + this.substring(index, this.length);
    }
  
    return string + this;
};

function formattazioneNumeri(value) {
    let roundNumber = Math.round(value)
    if (roundNumber<1)
        return '-'
    else if (roundNumber>=1 && roundNumber<1000)
        return roundNumber.toString() + modificatori.currency
    else if (roundNumber>=1000 && roundNumber<10000)
        return roundNumber.toString().insert(1, '.') + modificatori.currency
    else if (roundNumber>=10000 && roundNumber<100000)
        return roundNumber.toString().slice(0, -2).insert(2, '.') + modificatori.thousands + modificatori.currency
    else if (roundNumber>=100000 && roundNumber<1000000)
        return roundNumber.toString().slice(0, -3) + modificatori.thousands + modificatori.currency
    else if (roundNumber>=1000000)
        return roundNumber.toString().slice(0, -4).insert(1, '.') + modificatori.million + modificatori.currency
}

function formattazioneNumGrandi(value) {
    let roundNumber = Math.round(value)
    if (roundNumber==0)
        return '-'
    else if (Math.abs(roundNumber)>=1 && Math.abs(roundNumber)<1000)
        return roundNumber.toString() + modificatori.currency
    else if (Math.abs(roundNumber)>=1000 && Math.abs(roundNumber)<10000)
        return roundNumber = (roundNumber < 0) ? roundNumber.toString().insert(2, '.') + modificatori.currency:roundNumber.toString().insert(1, '.') + modificatori.currency
    else if (Math.abs(roundNumber)>=10000 && Math.abs(roundNumber)<100000)
        return roundNumber = (roundNumber < 0) ? roundNumber.toString().insert(3, '.') + modificatori.currency:roundNumber.toString().insert(2, '.') + modificatori.currency
    else if (Math.abs(roundNumber)>=100000 && Math.abs(roundNumber)<1000000)
        return roundNumber.toString().slice(0, -3) + modificatori.thousands + modificatori.currency
    else if (Math.abs(roundNumber)>=1000000)
        return roundNumber = (roundNumber < 0) ? roundNumber.toString().slice(0, -4).insert(2, '.') + modificatori.currency:roundNumber.toString().slice(0, -4).insert(1, '.') + modificatori.currency
}

function populateDictionary(categoryList, key, dataArray, dictionary) {
    dictionary[key] = {}
    for (i=0; i<categoryList.length; i++) {
        dictionary[key][categoryList[i]] = { name: categoryList[i].charAt(0).toUpperCase() + categoryList[i].toString().slice(1), value: dataArray[i] }
    }
}

const modificatori = { currency: '€', thousands: 'K', million: 'M' }
const colori = { 
    green: new Color('#2a9d8f'), 
    red: new Color('#e63948'), 
    blue: new Color('#467b9d'), 
    header: Color.dynamic(new Color('#343946'), Color.white()), 
    testi: Color.dynamic(new Color('#6e7276'), new Color('#ebebeb')), 
    refresh: Color.dynamic(new Color('#1d1d1b'), Color.white()),
    bg: Color.dynamic(new Color('#fafafa'), new Color('#191919'))
}
const font = {
    header: new Font('Helvetica Bold', 23),
    testi: new Font('Helvetica Bold', 13.5),
    cifre: new Font('Helvetica Bold', 22),
    refresh: new Font('Helvetica Light', 7)
}
const categorie = {
    keys : ['entrate', 'uscite', 'totali'],
    entrate : ['sostentamento', 'investimenti', 'case'],
    uscite : ['bollette', 'abbonamenti', 'intrattenimento', 'cibo', 'spesa', 'salute', 'shopping', 'auto', 'viaggi', 'lavoro', 'regali', 'altro'],
    totali : ['entrate', 'uscite', 'utile']
}
const sheet_id = 'YOUR_SHEET_ID'

// Widget
let widget = await createWidget();
Script.setWidget(widget);

async function createWidget() {
	let w = new ListWidget()
	w.backgroundColor = colori.bg
	w.respectScreenScale = true

	class stackClass {
    	constructor(stackName, stackSizeX, stackSizeY, spacing, paddingTop, paddingLeading, paddingBottom, paddingTrailing, ) {
        	stackName.size = new Size(stackSizeX, stackSizeY)
        	stackName.spacing = spacing
        	stackName.setPadding(paddingTop, paddingLeading, paddingBottom, paddingTrailing)
    	}
	}

	class stackText {
    	constructor (stackName, text, fontType, textColor, url, lineLimit) {
        	const varToStyle = stackName.addText(text)
        	varToStyle.font = fontType
        	varToStyle.textColor = textColor
        	varToStyle.url = url
        	varToStyle.lineLimit = lineLimit
    	}
	}

	var refreshDate = Date.now() + 1000*60*300 // 5 hours
	w.refreshAfterDate = new Date(refreshDate)

		// Url
		const endpoint = `https://spreadsheets.google.com/feeds/cells/${sheet_id}/1/public/full?alt=json`

		// Function that performs the request to the JSON endpoint
		async function loadItems() {
			let req = new Request(endpoint)
			let corpo = await req.loadJSON()
			// We return just the cells
			return corpo.feed.entry
		}
		// Request the spreadsheet data
		let json = await loadItems()

		// Function that retrieves the data from json based on index number
		function JSON_Key(number) {
			return json[number].gs$cell['numericValue']
		}

        // Initial arrays with the data from Google Sheets
        let googleSheetsData = {
            entrate : [JSON_Key(9), JSON_Key(17), JSON_Key(25)],
            uscite : [JSON_Key(7), JSON_Key(15), JSON_Key(23), JSON_Key(31), JSON_Key(38), JSON_Key(44), JSON_Key(50), JSON_Key(56), JSON_Key(62), JSON_Key(68), JSON_Key(74), JSON_Key(80)],
            totali : [JSON_Key(86), JSON_Key(87), JSON_Key(88)]
        }

        // New arrays with the data processed with the functions defined above
        let processedData = {
            entrate : googleSheetsData.entrate.map(formattazioneNumeri),
            uscite : googleSheetsData.uscite.map(formattazioneNumeri),
            totali : googleSheetsData.totali.map(formattazioneNumGrandi)
        }

        // Create an object that contains all the data
        const dati = {}
        populateDictionary(categorie.entrate, categorie.keys[0], processedData.entrate, dati)
        populateDictionary(categorie.uscite, categorie.keys[1], processedData.uscite, dati)
        populateDictionary(categorie.totali, categorie.keys[2], processedData.totali, dati)
        
        // Header
		const headerStack = w.addStack(); ; headerStack.setPadding(10, 6, 0, 0)
		new stackText(headerStack, 'BUDGETING', font.header, colori.header, `https://docs.google.com/spreadsheets/d/${sheet_id}`, 0)

		w.addSpacer(15)

		// Cifre stack (s1)
		const s1 = w.addStack(); s1.layoutHorizontally(); s1.centerAlignContent()
		new stackClass(s1, 0, 0, 10, 0, 5, 0, 5)
		const s1Ent = s1.addStack(); s1Ent.size = new Size(90,0)
		new stackText(s1Ent, dati.totali.entrate.value, font.cifre, colori.green, null, 1) // entrate
		const s1Usc = s1.addStack(); s1Usc.size = new Size(90,0)
		new stackText(s1Usc, dati.totali.uscite.value, font.cifre, colori.red, null, 1) //uscite
		const s1Uti = s1.addStack(); s1Uti.size = new Size(90,0)  
		new stackText(s1Uti, dati.totali.utile.value, font.cifre, colori.blue, null, 1) //utile

		w.addSpacer(15)

		// Entrate label
		const label1 = w.addStack(); label1.setPadding(0, 20, 0, 0)
		new stackText(label1, dati.totali.entrate.name.toUpperCase(), font.testi, colori.green, null, 0)
				
		w.addSpacer(7)

		// Entrate Stack (entStack)(stack composta da due stack)
		const entStack = w.addStack(); entStack.layoutHorizontally(); new stackClass(entStack, 0, 0, 10, 0, 6, 0, 0)
		// Green Rectangle
		let spacer = entStack.addStack(); spacer.backgroundColor = colori.green; spacer.addText(' '); spacer.size = new Size (0,51)

		w.addSpacer(15)

		// Categorie entrate (s2 stack layout verticale)
		const s2 = entStack.addStack(); s2.layoutVertically(); s2.spacing = 1
		new stackText(s2, dati.entrate.sostentamento.name, font.testi, colori.testi, null, 0)
		new stackText(s2, dati.entrate.investimenti.name, font.testi, colori.testi, null, 0)
		new stackText(s2, dati.entrate.case.name, font.testi, colori.testi, null, 0)

		// Cifre entrate (s3 stack layout verticale)
		const s3 = entStack.addStack(); s3.layoutVertically(); s3.spacing = 1
		new stackText(s3, dati.entrate.sostentamento.value, font.testi, colori.testi, null, 0)
		new stackText(s3, dati.entrate.investimenti.value, font.testi, colori.testi, null, 0)
		new stackText(s3, dati.entrate.case.value, font.testi, colori.testi, null, 0)
	
		// Uscite label
		const label2 = w.addStack(); label2.setPadding(0, 20, 0, 0)
		new stackText(label2, dati.totali.uscite.name.toUpperCase(), font.testi, colori.red, null, 0)	
			
		w.addSpacer(7)

		// Uscite Stack (uscStack)(stack composta da quattro stack)
		const uscStack = w.addStack(); uscStack.layoutHorizontally(); new stackClass(uscStack, 0, 0, 10, 0, 6, 0, 5)
		// Red Rectangle
		let spacer2 = uscStack.addStack(); spacer2.backgroundColor = colori.red; spacer2.addText(' '); spacer2.size = new Size (0,104)

		w.addSpacer(0)

		// Categorie uscite (s4 stack layout verticale)
		const s4 = uscStack.addStack(); s4.layoutVertically(); s4.spacing = 1
		new stackText(s4, dati.uscite.bollette.name, font.testi, colori.testi, null, 0)
		new stackText(s4, dati.uscite.abbonamenti.name, font.testi, colori.testi, null, 0)
		new stackText(s4, dati.uscite.intrattenimento.name, font.testi, colori.testi, null, 0)
		new stackText(s4, dati.uscite.cibo.name, font.testi, colori.testi, null, 0)
		new stackText(s4, dati.uscite.spesa.name, font.testi, colori.testi, null, 0)
		new stackText(s4, dati.uscite.salute.name, font.testi, colori.testi, null, 0)

		// Cifre uscite (s5 stack layout verticale)
		const s5 = uscStack.addStack(); s5.layoutVertically(); s5.spacing = 1
		new stackText(s5, dati.uscite.bollette.value, font.testi, colori.testi, null, 0)
		new stackText(s5, dati.uscite.abbonamenti.value, font.testi, colori.testi, null, 0)
		new stackText(s5, dati.uscite.intrattenimento.value, font.testi, colori.testi, null, 0)
		new stackText(s5, dati.uscite.cibo.value, font.testi, colori.testi, null, 0)
		new stackText(s5, dati.uscite.spesa.value, font.testi, colori.testi, null, 0)
		new stackText(s5, dati.uscite.salute.value, font.testi, colori.testi, null, 0)

		// Categorie uscite (s6 stack layout verticale)
		const s6 = uscStack.addStack(); s6.layoutVertically(); s6.spacing = 1
		new stackText(s6, dati.uscite.shopping.name, font.testi, colori.testi, null, 0)
		new stackText(s6, dati.uscite.auto.name, font.testi, colori.testi, null, 0)
		new stackText(s6, dati.uscite.viaggi.name, font.testi, colori.testi, null, 0)
		new stackText(s6, dati.uscite.lavoro.name, font.testi, colori.testi, null, 0)
		new stackText(s6, dati.uscite.regali.name, font.testi, colori.testi, null, 0)
		new stackText(s6, dati.uscite.altro.name, font.testi, colori.testi, null, 0)

		// Cifre uscite (s7 stack layout verticale)
		const s7 = uscStack.addStack(); s7.layoutVertically(); s7.spacing = 1
		new stackText(s7, dati.uscite.shopping.value, font.testi, colori.testi, null, 0)
		new stackText(s7, dati.uscite.auto.value, font.testi, colori.testi, null, 0)
		new stackText(s7, dati.uscite.viaggi.value, font.testi, colori.testi, null, 0)
		new stackText(s7, dati.uscite.lavoro.value, font.testi, colori.testi, null, 0)
		new stackText(s7, dati.uscite.regali.value, font.testi, colori.testi, null, 0)
		new stackText(s7, dati.uscite.altro.value, font.testi, colori.testi, null, 0)

	w.addSpacer(7)
		
	// Widget last update
	const l1 = w.addStack(); l1.layoutHorizontally(); l1.centerAlignContent(); l1.setPadding(0, 0, -8, 0)
	let today = new Date()
	let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear()
	let refreshLabel = w.addText('Aggiornato al: ' + date+','+new Date().toLocaleTimeString())
	refreshLabel.font = font.refresh; refreshLabel.textColor = colori.refresh; refreshLabel.textOpacity = 0.9; refreshLabel.centerAlignText()
	
	return w
}
Script.complete()
