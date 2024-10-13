import './AcquisitionDisplay.css'


export type AcquisitionObject = {
    name: string;
    url: string;
    purchasePrice: number;
    downPayment: number;
    sde: number;
    stepUp: string;
    sellerPercentage: number;
    bankPercentage: number;
    investorPercentage: number;
}

type AcquisitionDisplayProps = {
    business: AcquisitionObject;
    showBusiness: (business: AcquisitionObject) => void
}

const AcquisitionDisplay = ({ business, showBusiness }: AcquisitionDisplayProps) => {

    return (
        <div className="acquisition-display">
            <div className="row"><label>Name:</label> {business.name}</div>
            <div className="row"><label>Url:</label>  {business.url}</div>
            <div className="row"><label>Purchase Price:</label>  {business.purchasePrice}</div>
            <div className="row"><label>Down Payment:</label>  {business.downPayment}</div>
            <div className="row"><label>SDE:</label>  {business.sde}</div>
            <div className="row"><label>Step up:</label>  {business.stepUp}</div>
            <div className="row"><label>Seller Percentage:</label>  {business.sellerPercentage}</div>
            <div className="row"><label>Bank Percentage:</label>  {business.bankPercentage}</div>
            <div className="row"><label>Investor Percentage:</label>  {business.investorPercentage}</div>
            <button onClick={() => showBusiness(business)}>Show</button>
            <br />
        </div>
    )
}

export default AcquisitionDisplay