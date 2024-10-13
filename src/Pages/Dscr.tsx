import { useEffect, useState } from "react";
import LabelledInput from "../components/LabelledInput";
import DebtSection from "../components/DebtSection";
import { DebtItem, defaultBankDebtItem, defaultSellerDebtItem } from "../types";
import { calculateDscr, formatNum } from "../utilities";
import DraggablePieChart from "../components/draggable-pie-chart/DraggablePieChart";
import LabelledStringInput from "../components/LabelledStringInput";
import Cookies from 'js-cookie';
import './Dscr.css'
import AcquisitionDisplay, { AcquisitionObject } from "../components/AcquisitionDisplay";
/**
 * Class for calculating the DSCR in a various year
 * 
 * Assumptions:
 * Debt payments start in year 0
 * Payments are made in equal amounts over the loan term
 * 
 * DSCR notes: 
 * Big impact: 
 * - changing sde/noi
 * Small impact:
 * - changing the principal loan amount
 * - changing the debt source seller(8%) => investor(11.5%) 
 * 
 * TODO: consider adding FCCR in future (accounts for investor payments)
 * TODO: improve styling and usability for cookies
 */

const Dscr = () => {
    const [showBusinesses, setShowBusinesses] = useState(false);
    const [cookieToDelete, setCookieToDelete] = useState("");
    const [cookies, setCookies] = useState<AcquisitionObject[]>([]);

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [purchasePrice, setPurchasePrice] = useState(1000000);
    const [downPayment, setDownPayment] = useState(200000); //inital buyer investment
    const [sde, setSde] = useState(300000);
    const [debts, setDebts] = useState<DebtItem[]>([]);
    const [dscr, setDscr] = useState(0);

    const [sellerPercentage, setSellerPercentage] = useState(80);
    // The investor amount is not debt, you do not buy pay it down
    // they buy it and own it 
    const [investorPercentage, setInvestorPercentage] = useState(5);
    const [bankPercentage, setBankPercentage] = useState(15);

    const [stepUp, setStepUp] = useState("1.7");

    function fillInputs(business: AcquisitionObject) {
        setName(business.name);
        setUrl(business.url);
        setPurchasePrice(business.purchasePrice);
        setDownPayment(business.downPayment);
        setSde(business.sde);
        setSellerPercentage(business.sellerPercentage);
        setInvestorPercentage(business.investorPercentage);
        setBankPercentage(business.bankPercentage);

        setCookieToDelete(business.name);
    }

    function onPieChartChange(piechart: DraggablePieChart) {
        var percentages = piechart.getAllSliceSizePercentages();

        setSellerPercentage(formatNum(percentages[0] / 100));
        setInvestorPercentage(formatNum(percentages[1] / 100));
        setBankPercentage(formatNum(percentages[2] / 100));
    }

    const getParseAcquisitionCookies = () => {
        const allCookies = Cookies.get();
        const acquisitionObjects: AcquisitionObject[] = [];

        Object.entries(allCookies).forEach(([key, value]) => {
            try {
                acquisitionObjects.push(JSON.parse(value));
            } catch (e) {
                console.error(`Error parsing cookie ${key}`, e)
            }
        });
        return acquisitionObjects;
    }

    const setCookie = (objName: string, obj: AcquisitionObject) => {
        Cookies.set(objName, JSON.stringify(obj), { expires: 3, path: '/' });
        setCookies(getParseAcquisitionCookies());
    }

    const clearCookie = (objName: string) => {
        Cookies.remove(objName);
        setCookies(getParseAcquisitionCookies());
    }

    useEffect(() => {
        setDscr(calculateDscr(debts, sde))
    }, [purchasePrice, downPayment, sde, debts]);

    useEffect(() => {
        // investor payments are not included in dscr
        setDebts([defaultBankDebtItem, defaultSellerDebtItem]);
        setCookies(getParseAcquisitionCookies());

        const canvas = document.getElementById('customCanvas') as HTMLCanvasElement;
        if (canvas) {
            canvas.width = 300;
            canvas.height = 250;
            var proportions = [
                { proportion: sellerPercentage, format: { color: "#4CAF50", label: 'Seller' } },
                { proportion: investorPercentage, format: { color: "#0073e6", label: 'Investor' } },
                { proportion: bankPercentage, format: { color: "#B0BEC5", label: 'Bank' } },];
            const piechart = new DraggablePieChart({
                canvas: canvas,
                proportions: proportions,
                onchange: onPieChartChange
            });
            piechart.draw();
        }
    }, []);

    return (
        <div >
            <h2 className="header">Dscr</h2>
            <button onClick={() => setShowBusinesses(!showBusinesses)}>{showBusinesses ? "Hide " : "Show "} Businesses</button>
            <div className="display">
                {showBusinesses && <div className="inputs">
                    <h2>Stored Businesses:</h2>
                    {cookies.map((cookie, index) =>
                        <div key={index} className="cookies">
                            <AcquisitionDisplay business={cookie} showBusiness={fillInputs} />
                        </div>
                    )}
                </div>}
                <div className="inputs">
                    <br />
                    <LabelledStringInput labelText={"Name"} value={name} setValue={setName} />
                    <LabelledStringInput labelText={"Url"} value={url} setValue={setUrl} />
                    <LabelledInput labelText={"Purchase Price"} value={purchasePrice} setValue={setPurchasePrice} />
                    {/* typical down payment for business is 10-30% of purchase price */}
                    <LabelledInput labelText={"Down Payment"} value={downPayment} setValue={setDownPayment} />
                    <LabelledInput labelText={"SDE"} value={sde} setValue={setSde} />
                    <div className="row">
                        <>Step up: {stepUp}</>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.1"
                            value={stepUp}
                            onChange={(event) => setStepUp(event.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setCookie(name, {
                            name: name,
                            url: url,
                            purchasePrice: purchasePrice,
                            downPayment: downPayment,
                            sde: sde,
                            stepUp: stepUp,
                            sellerPercentage: sellerPercentage,
                            investorPercentage: investorPercentage,
                            bankPercentage: bankPercentage,
                        })}
                        disabled={name === ""}
                    >
                        Save
                    </button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <>
                        <LabelledStringInput labelText={"Business to remove"} value={cookieToDelete} setValue={setCookieToDelete} />
                        <button onClick={() => clearCookie(cookieToDelete)}>Remove business</button>
                    </>
                    <br />
                    <br />
                    <br />
                    <canvas id="customCanvas" />
                </div>
                <div className="outputs">
                    <DebtSection
                        totalDebt={purchasePrice - downPayment}
                        debts={debts}
                        setDebts={setDebts}
                        dscr={dscr}
                        bankAmount={bankPercentage}
                        setBankAmount={setBankPercentage}
                        investorAmount={investorPercentage}
                        setInvestorAmount={setInvestorPercentage}
                        sellerAmount={sellerPercentage}
                        setSellerAmount={setSellerPercentage}
                        stepUp={Number(stepUp)}
                    />
                </div>
            </div>


        </div>
    )
}

export default Dscr;