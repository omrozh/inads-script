let urlfinal = ""
let adname = ""
let apiKey = ""
let textcontent = ""
window.initRTB = false
const GAM_PATH = '/1972412/header-bid-tag-0';

function main(){
    class adUnit {
    constructor(slot, region) {
      this.code = `${slot}`;
      this.mediaTypes = {
          banner: {
            sizes: [slot.replace('inads-test-banner-', '').slice(0, -4).split('x').map(dimension => Number(dimension))],
          }
      },
        this.bids = [
          {
            bidder: 'rtbhouse',
            params: {
              region: `prebid-eu`,
              publisherId: '19LDVaTiaFOxkdi6muWS'
            }
          }
        ]
    }
  };

    const setPrebidConfig = (pbjs) => {
      pbjs.setConfig({
        debug: true,
      });

      pbjs.bidderSettings = {
        standard: {
          bidCpmAdjustment: (bidCpm, bid) => {
            return 20.00;
          },
          adserverTargeting: [{
            key: "hb_bidder",
            val: function (bidResponse) {
              return bidResponse.bidderCode;
            }
          },
          {
            key: "hb_adid",
            val: function (bidResponse) {
              return bidResponse.adId;
            }
          }]
        }
      }
    }



    (function () {
        var gads = document.createElement('script');
        gads.type = 'text/javascript';
        var useSSL = 'https:' == document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') +
               '//securepubads.g.doubleclick.net/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);
    })();
    

    const defineSlots = (adUnits) => {
      adUnits.forEach(adUnit => {
        const isNative = !!adUnit.mediaTypes.native;
        if (isNative) {
          googletag
            .defineSlot(
              `${GAM_PATH}/native/${adUnit.code}`, 

              adUnit.code // slot node id
            )
            .addService(googletag.pubads())
            .setTargeting('test-site', 1);
        } else {
          googletag
            .defineSlot(
              `${GAM_PATH}/banner/${adUnit.code}`,
              adUnit.mediaTypes.banner.sizes,
              adUnit.code
            )
            .addService(googletag.pubads())
            .setTargeting('test-site', 1);
        }

      });
    }

    function initAdserver() {
        if (pbjs.initAdserverSet) return;
        pbjs.initAdserverSet = true;
        googletag.cmd.push(function() {
            pbjs.que.push(function() {
                console.log("Push Init")
            });
        });
    }


    function initBidsRTBH(){
        const PREBID_TIMEOUT = 1000;
        const region = "prebid-eu";
        var adSlots = [];
        let adUnits;

        var googletag = googletag || {};
         googletag.cmd = googletag.cmd || [];
         googletag.cmd.push(function() {
             console.log("Push")
         });
        
        window.googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
        
        googletag.cmd.push(() => {
            googletag.pubads().disableInitialLoad();
        });

        if(window.initRTB){
            return;
        }    
        
        window.pbjs = pbjs || {};
        pbjs.que = pbjs.que || [];

        setPrebidConfig(pbjs);

        document.querySelectorAll('.inads').forEach(node => {
            adSlots.push(node.id);
        });
        adUnits = adSlots.map(slot => {
            return new adUnit(slot, region);
        });
        
        window.adUnits = adUnits;


        pbjs.que.push(function() {
            pbjs.addAdUnits(adUnits);
            pbjs.requestBids({
                bidsBackHandler: initAdserver,
                timeout: PREBID_TIMEOUT
            });
        });

        googletag.cmd.push(() => {
            defineSlots(adUnits);
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
            console.log("Google Tag")
            adUnits.forEach(adunit => {
              console.log("Render Start")
              googletag.display(adunit.code);
              console.log("Render Check")
            });
            googletag.pubads().addEventListener('slotRenderEnded', (event) => {
               console.log("ADS RENDERED")
           })
         });



        window.initRTB = true;
    }


    function adFeedCreate(element){
        var insertfeed = '<center> <span style="float: left">Discover by InAds Global</span>   <hr style="clear:both; color: black;">  <div class="inadsgroupsquare"></div>         <br style="clear: both">         <div style="margin-top: 5%; clear: both" class="inadsgroupsquare"></div>         <br style="clear: both">         <div style="margin-top: 5%; clear: both"><img style="margin-left: 12.5%; width: 75%" class=inads name=inadstandard></div><br style="clear: both">         <div style="margin-top: 5%; clear: both"><img style="margin-left: 12.5%; width: 75%" class=inads name=inadstandard></div> <br style="clear: both"> <div class="inadsgroupsquare"></div>         <br style="clear: both">         <div style="margin-top: 5%; clear: both" class="inadsgroupsquare"></div> </center><br style="clear:both">'
        element.insertAdjacentHTML("afterbegin", insertfeed)
    }

    function adGroupCreate(element){
        var insertadgrouper = '<img class="inads" name=inadstandard src="" alt="" style="float: left; width: 50%;">';
        element.insertAdjacentHTML("afterbegin", insertadgrouper + insertadgrouper + insertadgrouper + insertadgrouper)
    }

    function adGroupCreateHorizontal(element){
        var insertadgrouper = '<img class="inads" name=inadstandard src="" alt="" style="float: left; width: 23%; margin-left: 1%; margin-right:1%">';
        element.insertAdjacentHTML("afterbegin", insertadgrouper + insertadgrouper + insertadgrouper + insertadgrouper)
    }

    function adGroupCreateScroll(element){
        var insertadgroupersquare = '<div class="inads" name=inadsquare src="" alt="" style="float: left; width: 50%;"></div>';
        element.insertAdjacentHTML("afterbegin", insertadgroupersquare + insertadgroupersquare + insertadgroupersquare + insertadgroupersquare)
    }

    function adGroupCreateScrollSmall(element){
        var insertadgroupersquare = '<img class="inads" name=inadsquare src="" alt="" style="float: left; width: 50%;">';
        element.insertAdjacentHTML("afterbegin", insertadgroupersquare + insertadgroupersquare)
    }

    function adGroupCreateVertical(element){
        var insertadgroupersquare = '<img class="inads" name=inadsquare src="" alt="" style="float: left; width: 100%;">';
        element.insertAdjacentHTML("afterbegin", insertadgroupersquare + "<br style='clear: both'>" + insertadgroupersquare + "<br style='clear: both'>" + insertadgroupersquare  + "<br style='clear: both'>" + insertadgroupersquare)
    }

    function adGroupCreateSquare(element){
        var insertadgroupersquare = '<img class="inads" name=inadsquare src="" alt="" style="float: left; width: 20%; margin-left: 2%">';
        element.insertAdjacentHTML("afterbegin", insertadgroupersquare + insertadgroupersquare + insertadgroupersquare + insertadgroupersquare)
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }

    function InAdsEMPBid(element, index, total){
            if(!pbjs.initAdserverSet){
                if (element.getAttribute("name") == "inadsquare") {
                    element.setAttribute("id", "inads-test-banner-300x250" + getRandomInt(1000, 9999))
                }
                if (element.getAttribute("name") == "inadstandard") {
                    element.setAttribute("id", "inads-test-banner-728x90" + getRandomInt(1000, 9999))
                }
                if (element.getAttribute("name") == "inadstandard") {
                    element.setAttribute("id", "inads-test-banner-600x160" + getRandomInt(1000, 9999))
                }
            }

            if(index === (total - 1)){
                initBidsRTBH()
                if(pbjs.initAdserverSet){
                      pbjs.que.push(function() {
                      pbjs.requestBids({
                        timeout: 1000,
                        bidsBackHandler: function() {
                          pbjs.setTargetingForGPTAsync();
                          googletag.pubads().refresh();
                        }
                      });
                    });
                }
            }
    }

    function createAds(element, index, total){
      fetch("https://www.inadsglobal.com/view/" + element.getAttribute("name") + "/" + document.title)
      .then(res=>{adname = res.url.substring(res.url.lastIndexOf("/") + 1); element.setAttribute('onclick', "inadsclick(" + adname + ", this)"); return res.text()})
      .then(blob=>{

        console.log("%c Adverts by InAds ", "background:rgb(0, 255, 255); color: white")

        if(!(blob.includes("data"))){
            InAdsEMPBid(element, index, total)
            return;
        }

        var img = blob;
        element.setAttribute('src', img);

        if(element.getAttribute("name") == "inadsvideo"){
            var store = element.onclick;
            element.setAttribute("onclick", "")
            element.ondblclick = store
            element.muted = false
            element.volume = 0.4
            element.setAttribute("controls","controls");
            element.setAttribute("width", "360")
            element.setAttribute("height", "210")
        }

        if(element.getAttribute("name") != "inadsvideo"){
            element.setAttribute("ondblclick", "document.location='https://www.inadsglobal.com/report/" + adname + "'")
        }
        else{
            element.setAttribute("oncontextmenu", "document.location='https://www.inadsglobal.com/report/" + adname + "'")
        }

        if(element.getAttribute("name") == "inadstandard"){
            element.setAttribute("padding-bottom", "9.25%")
        }
        if(element.getAttribute("name") == "inadsbanner"){
            element.setAttribute("padding-bottom", "70%")
        }
        if(element.getAttribute("name") == "inadsquare"){
            element.setAttribute("padding-bottom", "100%")
        }
    })
    }

    let adFeed = document.getElementsByClassName("inadsfeed")

    for(var i = 0; i < adFeed.length; i++){
        adFeedCreate(adFeed[i]);
    }

    let adGroups = document.getElementsByClassName("inadsgroup");
    let adGroupsSquare = document.getElementsByClassName("inadsgroupsquare");
    let adGroupsScroll = document.getElementsByClassName("inadsgroupscroll");
    let adGroupsSmall = document.getElementsByClassName("inadsgroupscrollsmall");
    let adGroupsVertical = document.getElementsByClassName("inadsgroupvertical");
    let adGroupsHorizontal = document.getElementsByClassName("inadsgrouphorizontal");

    for(var i = 0; i < adGroupsScroll.length; i++){
        adGroupCreateScroll(adGroupsScroll[i]);
    }

    for(var i = 0; i < adGroupsHorizontal.length; i++){
        adGroupCreateHorizontal(adGroupsHorizontal[i]);
    }

    for(var i = 0; i < adGroupsSmall.length; i++){
        adGroupCreateScrollSmall(adGroupsSmall[i]);
    }

    for(var i = 0; i < adGroupsVertical.length; i++){
        adGroupCreateVertical(adGroupsVertical[i]);
    }

    for(var i = 0; i < adGroups.length; i++){
        adGroupCreate(adGroups[i]);
    }

    for(var i = 0; i < adGroupsSquare.length; i++){
        adGroupCreateSquare(adGroupsSquare[i]);
    }

    let adElements = document.getElementsByClassName("inads");

    if(adElements.length == 0){
        var insertbanner = '<div id=autoplacedb style="width: 10%; position: sticky; position: -webkit-sticky; right: 0; top: 0; z-index: 1;"><img class="inads" name=inadsbanner src="" alt="" style="float: left">';
        var insertad = '<div style="margin-left: 12.5%; width: 75%" class="inadsgrouphorizontal"></div>';
        document.body.insertAdjacentHTML("beforeEnd", insertad);
        // document.body.insertAdjacentHTML("afterbegin", insertbanner);
        document.body.insertAdjacentHTML("afterbegin", insertad);
        adElements = document.getElementsByClassName("inads");
    }


    let adGroupsHorizontal2 = document.getElementsByClassName("inadsgrouphorizontal");

    for(var i = 0; i < adGroupsHorizontal.length; i++){
        adGroupCreateHorizontal(adGroupsHorizontal2[i]);
    }

    for(var i = 0; i < adElements.length; i++) {
        createAds(adElements[i], i, adElements.length)
    }

    function inadsclick(index, elemnt){
        window.open("https://www.inadsglobal.com/adclick/" + index)
        elemnt.setAttribute("onclick", "window.open('https://www.inadsglobal.com/adclick/" + index + "/secondclick')")
    }

    function elementInViewport(el) {
      var top = el.offsetTop;
      var left = el.offsetLeft;
      var width = el.offsetWidth;
      var height = el.offsetHeight;

      while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
      }

      return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
      );
    }

    function timerAdsRefresh(){
        const ads = document.getElementsByClassName("inads")
        for(var i = 0; i < ads.length; i++){
            if(!elementInViewport(ads[i])){
                continue
            }
            createAds(ads[i], i, ads.length);
        }
    }

    function recurrAds(){
        setTimeout(function(){
            timerAdsRefresh()
            recurrAds()
        }, 15000)
    }

    recurrAds()
}

window.addEventListener('DOMContentLoaded', (event) => {
    main()
});
