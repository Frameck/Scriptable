<h1>INSTRUCTIONS</h1>

<p>This widget is used in combination with a google sheets file to pull data to display on your homescreen using Scriptable</p>


<h2>CODE</h2>

<p>The code has the name of the variables mainly in italian, but it's not that hard to change them if you need to</p>
<ol>
    <li>The widget supports both <strong>light</strong> and <strong>dark</strong> mode</li>
    <li>Where there's need to maintain the layout the numbers that are over 1000 are shortened with "k" indicator</li>
    <li>You can change the currency on line <strong>54</strong>, default is euro (€) <br> This won't affect the numbers because there's no calculation for currency exchange, it's just visual</li>
    <pre><code>const modificatori = { currency: '€', thousands: 'K', million: 'M' }</code></pre>
</ol>


<h2>SETTING THE SCRIPT</h2>

<ul>
  <li>
    Find and copy your sheet id:
    <ol>
      <li>Open your spreadsheet file</li>
      <li>Find and copy the sheet id like shown below</li>
      <pre><code>https://docs.google.com/spreadsheets/d/<strong>this_is_the_sheet_id</strong>/edit#gid=randomnumbers</code></pre>
    </ol>
  </li>
  <br>
  <li>Replace <strong>YOUR_SHEET_ID</strong> on line <strong>76</strong> <br>
    <pre><code>const sheet_id = 'YOUR_SHEET_ID'</code></pre>
  </li>
  <br>
  <li>
    Replace the number values inside this portion of the code on lines <strong>127-131</strong> if they don't match the correct values from your spreadsheet (<strong>order</strong>: <strong>left -> right</strong> appear in widget <strong>top -> bottom</strong>) <br>
    <ul>
      <li>the first row represents the values from the income categories</li>
      <li>the second row represents the values from the expenses categories</li>
      <li>the last row represents the income totals, expenses totals and the difference between these two</li>
    </ul>
    <pre><code>        let googleSheetsData = {
            entrate : [JSON_Key(9), JSON_Key(17), JSON_Key(25)],
            uscite : [JSON_Key(7), JSON_Key(15), JSON_Key(23), JSON_Key(31), JSON_Key(38), JSON_Key(44), JSON_Key(50), JSON_Key(56), JSON_Key(62), JSON_Key(68), JSON_Key(74), JSON_Key(80)],
            totali : [JSON_Key(86), JSON_Key(87), JSON_Key(88)]
        }</code></pre>
  </li>
  <br>
  <li>
    To find the correct values you can download 'Jayson' from the app store and open inside the app the url below (remember to change the sheet_id) to the all the data and determine which index you need <br>
    <pre><code>https://spreadsheets.google.com/feeds/cells/sheet_id/1/public/full?alt=json</code></pre>
  </li>
  <li>On the homescreen of your iPhone add a Large Scriptable widget and select the Budgeting script</li>
</ul>


<h2>GOOGLE SHEETS TEMPLATE</h2>

<p>
    If you want to use the same template that i use here's the link (make a copy in your drive):<br>
    <i>https://drive.google.com/drive/folders/1RItAQHRAxMEPS14VeN2frJ1XuyCJ7bLh?usp=sharing</i>
</p>

<p>Credit for this file goes to <a href="https://www.youtube.com/channel/UCeygFwM-zH0XEfMbjmHClxA" target="_blank">this</a> girl on youtube</p>


<h2>SET UP GOOGLE SHEETS</h2>

<ol>
    <li>Make a copy of the template in your Drive</li>
    <li>Publish your Google Sheet, <strong>File -> Publish To Web</strong></li>
</ol>

<p>Enjoy your widget</p>
