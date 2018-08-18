pragma solidity ^0.4.24;

import "./Ownable.sol";

contract Tender is Ownable{

    //Storage Variables
    string public tenderid;
    string public title;
    string public tenderCat;
    string public filtertype;
    string public desc;
    uint256 public tenderAmount;
    uint256 public duration;
    address public admin;
    address public winner;
    uint256 public winningbidamount;
    uint public count;

    // Creating a Struct for the Tender
    struct Contractor {
        address contractor;
        string contractid;
        string tendertype;
        uint256 bidamount;
        uint bidswon;
        uint duration;
    }

    Contractor[] public bids;

    struct Tender {
        string status;
        uint256 percent;
        address verifier;
    }

    mapping (string => Tender) tenderStatus;

    /**
     * @dev Store the tender details during deployment
     * @param _tenderid is the unique id for this tenderid
     * @param _title is title of the tender
     * @param _tenderCat is the name of the tender
     * @param _filtertype is the filter for selecting contractor based on the filter
     * @param _tenderAmount is the amount allocated for this tender
     * @param _desc is the desription of the tender
     * @param _duration of the tender
    */
    constructor(string _tenderid,
                string _title,
                string _tenderCat,
                string _filtertype,
                uint256 _tenderAmount,
                string _desc,
                uint256 _duration) {
        tenderid = _tenderid;
        title = _title;
        tenderCat = _tenderCat;
        filtertype = _filtertype;
        desc = _desc;
        admin=msg.sender;
        tenderAmount=_tenderAmount;
        duration= _duration;
        tenderStatus[_tenderid] = Tender("assigned",0,msg.sender);
    }


    /**
     * @dev get the address of the tender creator
    */
    function getAdminAddress() constant returns (address) {
        return msg.sender;
    }

    /**
     * @dev Stores the contractor details in a struct
     * @param _bidamount is the bid value submitted for tender
     * @param _contractid is contractid of the contractor
     * @param _tendertype is the type of the tender
     * @param _bidswon total bids won by this contractor in the past
     * @param _duration is the number of days to complete the project
    */
    function submitBid(uint256 _bidamount,string _contractid,string _tendertype,uint256 _bidswon,uint256 _duration) returns (bool,string){
        require(msg.sender != owner,"Owner should not be able to submit bid");
        bids.push(Contractor({contractor:msg.sender, bidamount:_bidamount,contractid:_contractid,tendertype:_tendertype,bidswon:_bidswon,duration:_duration}));
        return (true,"Bid submitted successfully");
    }

    /**
     * @dev reveals the winner of the tender by lowest amount
    */
    function revealbyAmount() onlyOwner constant returns (string,address,uint256,uint){
        require(bids.length!=0, "There are no bids submitted yet");
        Contractor tempbid=bids[0];
        uint temp_amount =tempbid.bidamount;
        uint temp_index=0;
        for (uint i=1; i< bids.length; i++) {
            if(bids[i].bidamount < temp_amount) {
                temp_amount = bids[i].bidamount;
                temp_index=i;
            }
        }
        winner=bids[temp_index].contractor;
        winningbidamount=bids[temp_index].bidamount;
        return(bids[temp_index].contractid,winner,winningbidamount,bids[temp_index].duration);
    }

    /**
     * @dev reveals the winner of the tender by lowest duration
    */
    function revealbyDuration() onlyOwner constant returns (string,address,uint256,uint){
        require(bids.length!=0, "There are no bids submitted yet");
        Contractor tempbid=bids[0];
        uint temp_amount =tempbid.duration;
        uint temp_index=0;
        for (uint i=1; i< bids.length; i++) {
            if(bids[i].duration < temp_amount) {
                temp_amount = bids[i].duration;
                temp_index=i;
            }
        }
        winner=bids[temp_index].contractor;
        winningbidamount=bids[temp_index].bidamount;
        return(bids[temp_index].contractid,winner,winningbidamount,bids[temp_index].duration);
    }

    /**
     * @dev function to return the number of bids submitted for this tender
    */
    function bidlength() public constant returns(uint){
        return (bids.length);
    }


    /**
     * @dev getBids is to display the bid details of a contractor
    */
    function getBids(uint i) constant returns(address,string,string,uint256,uint,uint){
        return (bids[i].contractor,bids[i].contractid,bids[i].tendertype,bids[i].bidamount,bids[i].bidswon,bids[i].duration);
    }

    /**
     * @dev displays all details about the tender
    */
    function getTenderDetails () constant returns (string,string,string,string,string,address,uint256,uint256) {
        return(tenderid,title,tenderCat,filtertype,desc,admin,tenderAmount,duration);
    }

    function updateStatus(string _tenderid,string tenderstatus, uint256 _percent,address verifier) {
        tenderStatus[_tenderid] = Tender(tenderstatus,_percent,verifier);
    }

    function getTenderStatus(string _tenderid) public constant returns(string,uint256,address) {
        return (tenderStatus[_tenderid].status,tenderStatus[_tenderid].percent,tenderStatus[_tenderid].verifier);
    }

}
