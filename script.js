//element
const buyBtn = document.getElementById("buyBtn"),
    goldboxBtn = document.getElementById("goldboxBtn"),
    openBtn = document.getElementById("openBtn"),
    openboxBtn = document.getElementById("openboxBtn"),
    blackchipBtn = document.getElementById("blackchipBtn"),
    applesText = document.getElementById("apples"),
    applechipsText = document.getElementById("appleChips"),
    blackchipsText = document.getElementById("blackChips"),
    goldboxText = document.getElementById("goldBox"),
    frenzytotemText = document.getElementById("FrenzyTotem"),
    countText = document.getElementById("count"),
    boxcountText = document.getElementById("boxCount"),
    prizeText = document.getElementById("prize");

//variable
let apples = 0,
    appleChips = 0,
    blackChips = 0,
    goldBox = 0,
    frenzyTotem = 0,
    count = 0,
    boxCount = 0,
    allPrize = {},
    smallPrize = [],//小獎1
    smallPrize2 = [],//小獎2航海
    bigPrize = [],//大獎池
    normalbigPrize = [],//漆黑碎片
    verybigPrize = {},//睿智葫蘆
    superbigPrize = {},//輪迴碑石
    goldboxPrize = [],//幸運的金色箱子
    blackchipsPrize = [],//漆黑的BOSS飾品
    textId = 0;

//載入後優先取得json
window.onload = () => {
    getJSON();
    alert("小技巧提醒：當點擊「開抽蘋果」按鈕後，可以長按Enter高速水溝。")
}
//fetch取得本地json
let getJSON = () => {
    fetch("./prizeData.json").then((res) => {
        return res.json();
    }).then((data) => {
        smallPrize = data.smallPrize;
        smallPrize2 = data.smallPrize2;
        bigPrize = data.bigPrize;
        normalbigPrize = data.normalbigPrize;
        verybigPrize = data.verybigPrize;
        superbigPrize = data.superbigPrize;
        goldboxPrize = data.goldboxPrize;
        blackchipsPrize = data.blackchipsPrize;
        // console.log(smallPrize);
        // console.log(bigPrize);
        // console.log(normalbigPrize);
        // console.log(verybigPrize);
        // console.log(superbigPrize);
        // console.log(goldboxPrize);
    }).catch((err) => {
        console.log("getJSON error");
    })
}

//使滾動條焦點在底部
function scrollBar(){
    for(let i=0;i<10;i++){
        prizeText.scrollIntoView(false);
    }
}

buyBtn.addEventListener("click", () => {
    apples += 35
    console.log("買了 "+apples+" 個蘋果")
    applesText.innerHTML = apples;
});
openBtn.addEventListener("click", () => {
    if(apples === 0){
        alert("黃金蘋果數量不足，請確認數量是否足夠。");
    }else{
        prizeText.focus;
        apples -= 1;
        appleChips += 1;
        count += 1;
        console.log("抽了"+count+"目前剩"+apples);
        //100.00%
        let probability = Math.round(Math.random()*10000);
        // console.log("若<92小獎 >=92大獎,中獎號為:"+probability);
        if(probability <= 6){
            //輪迴碑石0.06%
            frenzyTotem += 1;
            console.log("最後獎勵為：" + superbigPrize.name);
            prizeText.innerHTML += `<h6 class="appleBigprizeText" id="Id${textId+=1}">恭喜"你"從黃金蘋果機獲得<span class="textPrize">${superbigPrize.name}</span>。</h6>`;
            alert("恭喜從黃金蘋果機獲得【輪迴碑石】！");
        }else if(probability <= 111){
            //睿智葫蘆1.11%
            console.log("最後獎勵為：" + verybigPrize.name);
            prizeText.innerHTML += `<h6 class="appleBigprizeText" id="Id${textId+=1}">恭喜"你"從黃金蘋果機獲得<span class="textPrize">${verybigPrize.name}</span>。</h6>`;
        }else if(probability <= 691){
            //漆黑碎片(1) 6.91%
            blackChips += 1;
            console.log("最後獎勵為：" + normalbigPrize.name);
            prizeText.innerHTML += `<h6 class="appleBigprizeText" id="Id${textId+=1}">恭喜"你"從黃金蘋果機獲得<span class="textPrize">${normalbigPrize.name}</span>。</h6>`;
        }else if(probability <= 964){
            //上廣獎 9.64% 採用 普通皮皮計算上廣機率https://www.youtube.com/watch?v=al8tnzHBBo0&ab_channel=%E6%99%AE%E9%80%9A%E7%9A%AE%E7%9A%AE
            let normalP = Math.round(Math.random() * bigPrize.length)-1;
            console.log(normalP);
            console.log("最後獎勵為：" + bigPrize[normalP].name);
            prizeText.innerHTML += `<h6 class="appleBigprizeText" id="Id${textId+=1}">恭喜"你"從黃金蘋果機獲得<span class="textPrize">${bigPrize[normalP].name}</span>。</h6>`;
        }else if(probability <= 3000){
            //小獎 30% 航海師裝備
            let smallP2  = Math.round(Math.random() * smallPrize2.length)-1;
            console.log("最後獎勵為：" + smallPrize2[smallP2].name);
            prizeText.innerHTML += `<h6 class="appleText" id="Id${textId+=1}">已獲得<span class="textPrize">${smallPrize2[smallP2].name}</span> 道具1個。</h6>`;
        }else{
            //一般獎勵
            let smallP  = Math.round(Math.random() * smallPrize.length)-1;
            console.log("最後獎勵為：" + smallPrize[smallP].name);
            prizeText.innerHTML += `<h6 class="appleText" id="Id${textId+=1}">已獲得<span class="textPrize">${smallPrize[smallP].name}</span> 道具1個。</h6>`;
        }
        applesText.innerHTML = apples;
        applechipsText.innerHTML = appleChips;
        blackchipsText.innerHTML = blackChips;
        frenzytotemText.innerHTML = frenzyTotem;
        countText.innerHTML = count;
        removeText();
        scrollBar();
    }
});
goldboxBtn.addEventListener("click", () => {
    if(appleChips === 0 || appleChips < 100){
        alert("黃金蘋果碎片數量不足，請確認數量是否足夠。")
    }else if(appleChips >= 100){
        appleChips -= 100;
        goldBox += 1;
        goldboxText.innerHTML = goldBox;
        applechipsText.innerHTML = appleChips;
    }
});
openboxBtn.addEventListener("click", () => {
    if(goldBox === 0){
        alert("幸運的金色寶箱數量不足，請確認數量是否足夠。");
    }else{
        let probability = Math.round(Math.random()*100);
        if(probability <= 5){
            //輪迴5%
            frenzyTotem += 1;
            console.log("寶箱獎勵為：" + superbigPrize.name);
            prizeText.innerHTML += `<h6 class="goldboxText" id="Id${textId+=1}">恭喜"你"從幸運的金色箱子機獲得<span class="textPrize">【${superbigPrize.name}】</span>。</h6>`;
            alert("恭喜從黃金蘋果機獲得【輪迴碑石】！");
        }else{
            let goldboxP = Math.round(Math.random() * bigPrize.length)-1;
            if(goldboxPrize[goldboxP].name == "漆黑的Boss飾品碎片(10)"){
                blackChips += 10;
            }else if(goldboxPrize[goldboxP].name == "漆黑的Boss飾品碎片(15)"){
                blackChips += 15;
            }else if(goldboxPrize[goldboxP].name == "漆黑的Boss飾品碎片(20)"){
                blackChips += 20;
            }
            console.log("寶箱獎勵為：" + goldboxPrize[goldboxP].name);
            prizeText.innerHTML += `<h6 class="goldboxText" id="Id${textId+=1}">恭喜"你"從幸運的金色箱子機獲得<span class="textPrize">[${goldboxPrize[goldboxP].name}]</span>。</h6>`;
        }
        boxCount += 1;
        goldBox -= 1;
        blackchipsText.innerHTML = blackChips;
        boxcountText.innerHTML = boxCount;
        goldboxText.innerHTML = goldBox;
        frenzytotemText.innerHTML = frenzyTotem;
        removeText();
        scrollBar();
    }
});
blackchipBtn.addEventListener("click", () => {
    if(blackChips === 0 || blackChips < 50){
        alert("漆黑的BOSS飾品碎片數量不足，請確認數量是否足夠。");
    }else{
        //漆黑的boss飾品機率相同，取隨機
        blackChips -= 50;
        let blackchipsP = Math.round(Math.random() * blackchipsPrize.length)-1;
        console.log("漆黑飾品獎勵為：" + blackchipsPrize[blackchipsP].name);
        prizeText.innerHTML += `<h6 class="blackchipsText" id="Id${textId+=1}">從漆黑的BOSS飾品碎片中獲得<span class="textPrize">${blackchipsPrize[blackchipsP].name}</span>了。</h6>`;
        removeText();
        scrollBar();
    }
    blackchipsText.innerHTML = blackChips;
});
//捲軸範圍超過scrollHeight時移除溢出的標籤
function removeText(){
    if(prizeText.scrollHeight > 1921){
        let removeId = textId-100
        document.getElementById("Id"+removeId).remove();
    }
}