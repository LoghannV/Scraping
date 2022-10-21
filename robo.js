const puppeteer = require("puppeteer");
const wokerking = require("tesseract.js");

async function tipoRobo(){
    const navegador = await puppeteer.launch({headless:true})
    const paginaweb = await navegador.newPage()
    const urlGoogle = `https://www.google.com/search?q=data+e+hora+atual&rlz=1C1GCEU_
    pt-BRBR1024BR1025&oq=data+e+h&aqs=chrome.0.69i59j0i131i433i512j69i57j0i457i512j0i512l6.1712j0j7&sourceid=chrome&ie=UTF-8`
    var data = new Date();
    var dia = data.getDate();
    var mes = (data.getMonth() + 1);
    var segundo = data.getSeconds();
    var milesegundo = data.getMilliseconds();
    if(parseInt(dia)<=9){dia = "0"+dia}
    if(parseInt(mes)<=9){mes = "0"+mes}  
    var ano = data.getFullYear();
    var nome = dia+''+mes+''+ano+''+segundo+''+milesegundo;

    await paginaweb.goto(urlGoogle)

    await paginaweb.screenshot({path: nome+'.png'})

    await navegador.close()
    const worker = wokerking.createWorker({
        logger: m => console.log(m)
      });
      
   
    await worker.load();
    await worker.loadLanguage('eng+por');
    await worker.initialize('eng+por');
    const { data: { text } } = await worker.recognize(__dirname+"/"+nome+'.png');
    console.log(text);
    await worker.terminate();
    
}
tipoRobo()