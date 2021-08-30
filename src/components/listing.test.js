import { render, fireEvent } from "@testing-library/react"
import Listing from "./listing"

describe("test elements", () => {
    let listings, listColumns

    beforeEach(() => {
        listings = [
            { "country": "China", "state-province": null, "web_pages": ["http://www.hdpu.edu.cn/"], "alpha_two_code": "CN", "name": "University of Petroleum (East China)", "domains": ["hdpu.edu.cn"] },
            { "country": "China", "state-province": null, "web_pages": ["http://www.cau.edu.cn/"], "alpha_two_code": "CN", "name": "China Agricultural University", "domains": ["cau.edu.cn"] },
            { "country": "China", "state-province": null, "web_pages": ["http://www.bjaeu.edu.cn/"], "alpha_two_code": "CN", "name": "China Agriculture University East", "domains": ["bjaeu.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.chinaacademyofart.com/"], "alpha_two_code": "CN", "name": "China Academy of Art", "domains": ["chinaacademyofart.com"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cpu.edu.cn/"], "alpha_two_code": "CN", "name": "China Pharmaceutical University Nanjing", "domains": ["cpu.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cyc.edu.cn/"], "alpha_two_code": "CN", "name": "China youth college for political science", "domains": ["cyc.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cfau.edu.cn/"], "alpha_two_code": "CN", "name": "China Foreign Affairs University", "domains": ["cfau.edu.cn"] }, 
            { "country": "Taiwan", "state-province": null, "web_pages": ["http://www.cmc.edu.tw/"], "alpha_two_code": "TW", "name": "China Medical College", "domains": ["cmc.edu.tw"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cmu.edu.cn/"], "alpha_two_code": "CN", "name": "China Medical University Shenyang", "domains": ["cmu.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ctgu.edu.cn/"], "alpha_two_code": "CN", "name": "China Three Gorges University", "domains": ["ctgu.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cubu.edu/"], "alpha_two_code": "CN", "name": "China USA Business University", "domains": ["cubu.edu"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cupl.edu.cn/"], "alpha_two_code": "CN", "name": "China University of Political Science and Law", "domains": ["cupl.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cug.edu.cn/"], "alpha_two_code": "CN", "name": "China University of Geosciences Wuhan", "domains": ["cug.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cugb.edu.cn/"], "alpha_two_code": "CN", "name": "China University of Geoscience Beijing", "domains": ["cugb.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cumt.edu.cn/"], "alpha_two_code": "CN", "name": "China University of Mining Technology - Xuzhou", "domains": ["cumt.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cumtb.edu.cn/"], "alpha_two_code": "CN", "name": "China University of Mining Technology - Beijing", "domains": ["cumtb.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cuc.edu.cn/"], "alpha_two_code": "CN", "name": "Communication University of China", "domains": ["cuc.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ccnu.edu.cn/"], "alpha_two_code": "CN", "name": "Central China Normal University", "domains": ["ccnu.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.cauc.edu/"], "alpha_two_code": "CN", "name": "Civil Aviation University of China", "domains": ["cauc.edu"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ustc.edu.cn/"], "alpha_two_code": "CN", "name": "University of Science and Technology of China", "domains": ["ustc.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.wcums.edu.cn/"], "alpha_two_code": "CN", "name": "West China University of Medical Sciences", "domains": ["wcums.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.usc.edu.cn/"], "alpha_two_code": "CN", "name": "South China University", "domains": ["usc.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.sustc.edu.cn/"], "alpha_two_code": "CN", "name": "South University of Science and Technology of China", "domains": ["sustc.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.uestc.edu.cn/"], "alpha_two_code": "CN", "name": "University of Electronic Science and Technology of China", "domains": ["uestc.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.jci.edu.cn/"], "alpha_two_code": "CN", "name": "Jingdezhen China Institute", "domains": ["jci.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ecjtu.jx.cn/"], "alpha_two_code": "CN", "name": "East China Jiao Tong University", "domains": ["ecjtu.jx.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ecust.edu.cn/"], "alpha_two_code": "CN", "name": "East China University of Science and Technology", "domains": ["ecust.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ecnu.edu.cn/"], "alpha_two_code": "CN", "name": "East China Normal University", "domains": ["ecnu.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.scnu.edu.cn/"], "alpha_two_code": "CN", "name": "South China Normal University", "domains": ["scnu.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.scut.edu.cn/"], "alpha_two_code": "CN", "name": "South China University of Technology", "domains": ["scut.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.scau.edu.cn/"], "alpha_two_code": "CN", "name": "South China Agricultural University", "domains": ["scau.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.sccu.edu.cn/"], "alpha_two_code": "CN", "name": "South China Construction University", "domains": ["sccu.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ruc.edu.cn/"], "alpha_two_code": "CN", "name": "Renmin University of China", "domains": ["ruc.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ncepubj.edu.cn/"], "alpha_two_code": "CN", "name": "North China Electric Power University", "domains": ["ncepubj.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ncut.edu.cn/"], "alpha_two_code": "CN", "name": "North China University of Technology", "domains": ["ncut.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.nottingham.edu.cn/"], "alpha_two_code": "CN", "name": "The University of Nottingham Ningbo China", "domains": ["nottingham.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.ouc.edu.cn/"], "alpha_two_code": "CN", "name": "Ocean University of China", "domains": ["ouc.edu.cn"] }, 
            { "country": "China", "state-province": null, "web_pages": ["http://www.zgfxy.cn/"], "alpha_two_code": "CN", "name": "Buddhist Acamedy of China", "domains": ["zgfxy.cn"] }, 
            { "country": "China", "state-province": "Guangzhou", "web_pages": ["https://www.gcu.edu.cn/"], "alpha_two_code": "CN", "name": "Guangzhou College of South China University of Technology", "domains": ["stu.gcu.edu.cn"] }]
    
        listColumns = [{
            id: "name",
            label: "Name",
            align: "left",
            minWidth: 100
        }, {
            id: "country",
            label: "Country",
            align: "left",
            minWidth: 100
        }, {
            id: "web_pages",
            label: "Websites",
            align: "left",
            minWidth: 100
        }]
    })

    test("elements on load", () => {
        const { getByText } = render(<Listing rows={listings} columns={listColumns}/>)
        const nameCol = getByText("Name")
        const countryCol = getByText("Country")
        const webPagesCol = getByText("Websites")
        const numText = getByText("1-10 of 39")
        expect(nameCol).toBeInTheDocument()
        expect(countryCol).toBeInTheDocument()
        expect(webPagesCol).toBeInTheDocument()
        expect(numText).toBeInTheDocument()
    })

    test("empty list", () => {
        const { getByTestId } = render(<Listing rows={[]} columns={listColumns}/>)
        const noDataEl = getByTestId("no-data")
        expect(noDataEl).toBeInTheDocument()
    })
})