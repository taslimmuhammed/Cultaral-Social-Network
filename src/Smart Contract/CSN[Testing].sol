//SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

library SafeMath {
    function tryAdd(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    function trySub(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    function tryMul(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    function tryDiv(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    function tryMod(uint256 a, uint256 b)
        internal
        pure
        returns (bool, uint256)
    {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}



pragma solidity ^0.8.0;

contract GCU {
    using SafeMath for uint256;
    mapping(address => uint256) public unitBalance;
    mapping(address => address) public referral;
    mapping(address => uint8) public active;
    mapping(address => uint256) public unitCount;
    mapping(address => rf) public myRefferals;
    mapping(address => uint256) public referenceProfit;
    mapping(address => uint256) public benifit;
    mapping(address => uint256) public IN;
    mapping(uint256=>mapping(address => uint256)) public monthlyReferals;
    struct ReferalStruct {
         address userAddress;
        uint256 referalCount;
    }
    address[] public userList;
    address[] queue;
    uint256 front;
    uint256 rear;
    uint256 public userLimit;
    //uint256 public monthCounter;
    uint256 public monthTimer;
    uint256 public unitLimit;
    uint256 public totalSupply;
    address public owner;
    event Win(address winner);
    event BoughtUnit(address buyer, uint256 amount);
    event SignedIn(address newUser, address referrer);
    address payable reserve1 =
        payable(0xEDd1BA0359f50635143420c3E819E7a32bb62EDB);
    address payable reserve2 =
        payable(0x8834b8C2B0Da7767E37ed0351B4909Df82C09EF1);
    address payable reserve3 =
        payable(0x93745f068AE3A1C1a7Fb2ff42fe1906437fa2681);
    address payable reserve4 =
        payable(0x20ca94c246258ae60EB7a1E145EFE4a7511D51fC);
    address payable reserve5 =
        payable(0x1ABF9fbd443Af96Fb5d7F4354Adc582c7C54AA23);
    address admin = 0xCd288a0466b42E4274446Ff4C734F4714Fe9c326;
    address developer = 0xd0cc32348E98f148E769f034A9C79b1C5a0e2A78;
    address payable Wallet =
        payable(0xd0cc32348E98f148E769f034A9C79b1C5a0e2A78);

    struct rf {
        uint256 lvl1;
        uint256 lvl2;
        uint256 lvl3;
        uint256 lvl4;
        uint256 lvl5;
        uint256 lvl6;
        uint256 lvl7;
        uint256 lvl8;
        uint256 lvl9;
    }

    constructor() {
        owner = admin;
        unitLimit = 2700;
        userLimit = 10;
        monthTimer = block.timestamp;
    }
    
    modifier loggedIn() {
        require(active[msg.sender] != 0, "Sign In first");
        _;
    }

     modifier checkOwnerShip() {
        require( msg.sender == owner || msg.sender == developer, "Only owner can access" );
        _;
    }

    function getMyRefferals(address _account) public view returns (rf memory) {
        return myRefferals[_account];
    }

    function changeOwner(address _newOwner) public checkOwnerShip {
        owner = _newOwner;
    }

    function changeUserLimit(uint256 newLimit) public checkOwnerShip {
        userLimit = newLimit;
    }

    function changeLimit(uint256 _limit) public checkOwnerShip{
        unitLimit = _limit;
    }

    function getQueue() public view checkOwnerShip returns (address[] memory) {
        return queue;
    }

    function checkUserLimit(bool _active, uint256 _amount)
        public
        view
        returns (bool)
    {
        if (_active == true) {
            if ((unitCount[msg.sender] + _amount) <= userLimit) return true;
            else return false;
        } else {
            if ((unitCount[msg.sender] + _amount) <= 1) return true;
            else return false;
        }
    }
    function currentMonth() public view returns(uint256){
        uint256 diff = (block.timestamp - monthTimer) / 60 / 60 / 24 / 30 ;
        return diff;
    }
    function signIn(address _friend, bool _active) public returns (bool) {
        require(msg.sender != _friend);
        require(active[msg.sender] == 0, "Already signed in");
        require(  ((active[_friend] == 2) ||  (_friend == 0x0000000000000000000000000000000000000000)), "Invalid referal id" );
        require(referral[_friend] != msg.sender, "Cant referal each other");
        require(((unitCount[_friend]>=1)||(_friend==0x0000000000000000000000000000000000000000)), "The referrer must buy atleast one ticket to refer");
        userList.push(msg.sender);
        referral[msg.sender] = _friend;
        uint8 act = 1;
        if (_active) act = 2;
        active[msg.sender] = act;
        emit SignedIn(msg.sender, _friend);
        uint256 i = 0;
        // Referal Part
        for (i = 0; i < 9; i++) {
            if (_friend == 0x0000000000000000000000000000000000000000) break;
            if (i == 0) myRefferals[_friend].lvl1++;
            if (i == 1) myRefferals[_friend].lvl2++;
            if (i == 2) myRefferals[_friend].lvl3++;
            if (i == 3) myRefferals[_friend].lvl4++;
            if (i == 4) myRefferals[_friend].lvl5++;
            if (i == 5) myRefferals[_friend].lvl6++;
            if (i == 6) myRefferals[_friend].lvl7++;
            if (i == 7) myRefferals[_friend].lvl8++;
            if (i == 8) myRefferals[_friend].lvl9++;

            if(i>1) 
            monthlyReferals[currentMonth()][_friend] =monthlyReferals[currentMonth()][_friend].add(1); 
            _friend = referral[_friend];
            //   uint256 k = 0;
           // ReferalStruct memory temp = ReferalStruct(_friend, 1);

            //Countinf till address matches
            // for (k = 0; k < monthlyRewardList[monthCounter].length; k++)
            //     if (
            //         _friend ==
            //         monthlyRewardList[monthCounter][k]
            //      ) break;
    

            // if (monthlyRewardList[monthCounter].length == k)
            //     monthlyRewardList[monthCounter].push(temp);
            // else {
            //     monthlyRewardList[monthCounter][k-1].referalCount = monthlyRewardList[monthCounter][k-1].referalCount.add(1);
            //     temp  =  monthlyRewardList[monthCounter][k-1];
            //     uint256 j = k-1;

            //     for(j; j>0;j--){
            //         if( monthlyRewardList[monthCounter][j].referalCount >= temp.referalCount) break;
            //         else {
            //             temp  =  monthlyRewardList[monthCounter][j];
            //             monthlyRewardList[monthCounter][j] = monthlyRewardList[monthCounter][j-1];
            //             monthlyRewardList[monthCounter][j-1] =temp;
            //         }
            //     }
            // }

        }

 
        return true;
    }

    function handleReferal() private {
        address payable _friend;
        uint256 _amount = 18;
        //level 1
        if (
            referral[msg.sender] != 0x0000000000000000000000000000000000000000
        ) {
            _friend = payable(referral[msg.sender]);
            _friend.transfer(.9 ether);
            _amount -= 9;
            referenceProfit[_friend] = referenceProfit[_friend].add(9);
            //level 2
            if (
                referral[_friend] != 0x0000000000000000000000000000000000000000
            ) {
                _friend = payable(referral[_friend]);
                _friend.transfer(.2 ether);
                _amount -= 2;
                referenceProfit[_friend] = referenceProfit[_friend].add(2);
                //level 3
                if (
                    referral[_friend] !=
                    0x0000000000000000000000000000000000000000
                ) {
                    _friend = payable(referral[_friend]);
                    _friend.transfer(.1 ether);
                    _amount -= 1;
                    referenceProfit[_friend] = referenceProfit[_friend].add(1);

                    //level 4
                    if (
                        referral[_friend] !=
                        0x0000000000000000000000000000000000000000 &&
                        myRefferals[_friend].lvl1 >= 3
                    ) {
                        _friend = payable(referral[_friend]);
                        _friend.transfer(.1 ether);
                        _amount -= 1;
                        referenceProfit[_friend] = referenceProfit[_friend].add(
                            1
                        );
                        //level 5
                        if (
                            referral[_friend] !=
                            0x0000000000000000000000000000000000000000 &&
                            myRefferals[_friend].lvl1 >= 3
                        ) {
                            _friend = payable(referral[_friend]);
                            _friend.transfer(.1 ether);
                            _amount -= 1;
                            referenceProfit[_friend] = referenceProfit[_friend]
                                .add(1);
                            ////level 6
                            if (
                                referral[_friend] !=
                                0x0000000000000000000000000000000000000000 &&
                                myRefferals[_friend].lvl1 >= 3
                            ) {
                                _friend = payable(referral[_friend]);
                                _friend.transfer(.1 ether);
                                _amount -= 1;
                                referenceProfit[_friend] = referenceProfit[
                                    _friend
                                ].add(1);
                                //level 7
                                if (
                                    referral[_friend] !=
                                    0x0000000000000000000000000000000000000000 &&
                                    myRefferals[_friend].lvl1 >= 6
                                ) {
                                    _friend = payable(referral[_friend]);
                                    _friend.transfer(.1 ether);
                                    _amount -= 1;
                                    referenceProfit[_friend] = referenceProfit[
                                        _friend
                                    ].add(1);
                                    //level 8
                                    if (
                                        referral[_friend] !=
                                        0x0000000000000000000000000000000000000000 &&
                                        myRefferals[_friend].lvl1 >= 6
                                    ) {
                                        _friend = payable(referral[_friend]);
                                        _friend.transfer(.1 ether);
                                        _amount -= 1;
                                        referenceProfit[
                                            _friend
                                        ] = referenceProfit[_friend].add(1);
                                        //level 9
                                        if (
                                            referral[_friend] !=
                                            0x0000000000000000000000000000000000000000 &&
                                            myRefferals[_friend].lvl1 >= 6
                                        ) {
                                            _friend = payable(
                                                referral[_friend]
                                            );
                                            _friend.transfer(.1 ether);
                                            _amount -= 1;
                                            referenceProfit[
                                                _friend
                                            ] = referenceProfit[_friend].add(1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (_amount != 0) reserve5.transfer(_amount.mul(100000000000000000));
    }

    function handleLot() private {
        queue.push(msg.sender);
        if ((rear % 2) == 1) {
            bool _active = true;
            if (active[queue[front]] == 1) _active = false;
            //rewarding
            benifit[queue[front]] = benifit[queue[front]].add(1);
            if (_active == true) {
                unitBalance[queue[front]] = unitBalance[queue[front]].add(100);
                payable(queue[front]).transfer(2 ether);
            } else {
                payable(queue[front]).transfer(12 ether);
            }
            emit Win(queue[front]);
            front = front.add(1);
        }
        rear = rear.add(1);
    }

    function handleReserves() private {
        reserve1.transfer(.2 ether);
        reserve2.transfer(.2 ether);
        reserve3.transfer(.2 ether);
        reserve4.transfer(.5 ether);
        reserve5.transfer(.6 ether);
        Wallet.transfer(.5 ether);
    }
    
    function enterGame() public loggedIn returns (bool) {
        require(unitBalance[msg.sender] >= 100, "Not enough tickets left");
        bool _active = true;
        if (active[msg.sender] == 1) _active = false;
        unitBalance[msg.sender] = unitBalance[msg.sender].sub(100);
        handleLot();
        handleReserves();
        if (_active) handleReferal();
        else reserve5.transfer(1.8 ether);
        IN[msg.sender] = IN[msg.sender].add(1);
        return true;
    }

    function buyUnitToken(uint256 _amount) public payable loggedIn {
        uint256 price = _amount.mul(10000000000000000000);
        require(msg.value >= price , "please pay the right amount");
        bool _active = true;
        if (active[msg.sender] == 1) _active = false;
        require(checkUserLimit(_active, _amount), "Maximum user limit reached");
        require(totalSupply <= unitLimit, "Maximum supply limit reached");
        unitBalance[msg.sender] = unitBalance[msg.sender].add(_amount * 100);
        unitCount[msg.sender] = unitCount[msg.sender].add(_amount);
        totalSupply = totalSupply.add(_amount);
        emit BoughtUnit(msg.sender, _amount);
    }

    // function getMonthStatus() public view returns (bool) {
    //     uint256 diff = (block.timestamp - monthTimer) / 60 / 60 / 24;
    //     if (diff >= 30) return true;
    //     else return false;
    // }

    function getDays() public view returns (uint256) {
        uint256 diff = (block.timestamp - monthTimer) / 60 / 60 / 24;
        diff = diff%30;
        return diff;
    }
    //  function getDaysLeft() public view returns (uint) {
    //     uint diff = (block.timestamp - monthTimer) / 60 / 60 / 24;
    //     if(30>diff && diff>0) 
    //     else return 0;  
    // }
    // function updateMonth() public checkOwnerShip{
    //     // require(
    //     //     getMonthStatus(),
    //     //     "It should be atleast 30 days before you can update the list"
    //     // );

    //     monthCounter = monthCounter.add(1);
    //     monthTimer = block.timestamp;
    // }

    function getReferalList(uint256 _month) public view returns(ReferalStruct[] memory){
        uint256 i;
        uint256 z = userList.length;
         ReferalStruct[] memory arr = new ReferalStruct[](z);
        for(i=0;i<userList.length;i++){
            address temp  =userList[i] ;
            uint256 tempNo = monthlyReferals[_month][temp];
            arr[i]=ReferalStruct(temp,tempNo);
        }
        return arr;
    }
    
    function getCurrentMonthWinners() public view returns(ReferalStruct[] memory){
        uint256 _month = currentMonth();
        uint256 i;uint256 j;
        uint256 n = userList.length;
         ReferalStruct[] memory arr = new ReferalStruct[](n);
        for(i=0;i<n;i++){
            address temp  =userList[i] ;
            uint256 tempNo = monthlyReferals[_month][temp];
            arr[i]=ReferalStruct(temp,tempNo);
        }
        ReferalStruct memory tempStruct;
        //Bubble Sort 
         for (i = 0; i < n - 1; i++)
        for (j = 0; j < n - i - 1; j++)
            if (arr[j].referalCount < arr[j + 1].referalCount)
                {
                   tempStruct = arr[j];
                   arr[j] = arr[j+1];
                   arr[j+1]= tempStruct;
                }
        uint256 x =9;
        if (n<9) x= n;
        ReferalStruct[] memory tempArray= new ReferalStruct[](n); 
        for(i=0; i<n;i++) tempArray[i] =arr[i];
        return tempArray ;
    }

    function getTotalUsersRanks() public view returns(ReferalStruct[] memory){
        uint256 _month = currentMonth();
        uint256 i; uint256 j;
        uint256 n = userList.length;
         ReferalStruct[] memory arr = new ReferalStruct[](n);
        for(i=0;i<n;i++){
            address temp  =userList[i] ;
            uint256 tempNo = monthlyReferals[_month][temp];
            arr[i]=ReferalStruct(temp,tempNo);
     }
     ReferalStruct memory tempStruct;
        //Bubble Sort 
         for (i = 0; i < n - 1; i++)
           for (j = 0; j < n - i - 1; j++)
            if (arr[j].referalCount > arr[j + 1].referalCount)
                {
                   tempStruct = arr[j];
                   arr[j] = arr[j+1];
                   arr[j+1]= tempStruct;
                }
        return arr;
    }
    function getRank(address addr) public view returns(uint256){
        uint256 _month = currentMonth();
        uint256 i; uint256 j;
        uint256 n = userList.length;
         ReferalStruct[] memory arr = new ReferalStruct[](n);
        for(i=0;i<n;i++){
            address temp  =userList[i] ;
            uint256 tempNo = monthlyReferals[_month][temp];
            arr[i]=ReferalStruct(temp,tempNo);
     }
     ReferalStruct memory tempStruct;
        //Bubble Sort 
         for (i = 0; i < n - 1; i++)
           for (j = 0; j < n - i - 1; j++)
            if (arr[j].referalCount > arr[j + 1].referalCount)
                {
                   tempStruct = arr[j];
                   arr[j] = arr[j+1];
                   arr[j+1]= tempStruct;
                }
          
          for (i = 0; i < n - 1; i++) if(arr[i].userAddress == addr) break;

          return (i+1);
    }
    // function getWinners(uint256 _month) public view returns (ReferalStruct[] memory) {
    //     ReferalStruct[] memory newList;
    //     // ReferalStruct memory temp;
    //     // uint256 n = newList.length;
    //     // uint256 i;
    //     // uint256 j;
    //     // for (i = 0; i < n - 1; i++)
    //     //     for (j = 0; j < n - i - 1; j++)
    //     //         if (newList[j].referalCount > newList[j + 1].referalCount) {
    //     //             temp = newList[j];
    //     //             newList[j] = newList[j + 1];
    //     //             newList[j + 1] = temp;
    //     //         }

    //     for(uint8 i=0; i<9;i++) newList[i] = monthlyRewardList[_month][i];
    //     return newList;
    // }

    // function getCurrentMonthWinners() public view returns (ReferalStruct[] memory) {
    //     return getWinners(monthCounter);
    // }

    fallback() external{
        revert("wrong transaction");
    }

    function withDrawMoney() public checkOwnerShip{
        reserve5.transfer(address(this).balance);
    }
    function checkContractBalance() public view returns(uint256){
        return address(this).balance;
    }
    //changes while production
    //-changes for test[month related] -2 ( 139, 358 )
    //-withdraw function
    //-change modifier to owner only
    //currentMonth = moth
}



// pragma solidity ^0.8.0;

// interface IERC20 {
//     event Transfer(address indexed from, address indexed to, uint256 value);
//     event Approval(
//         address indexed owner,
//         address indexed spender,
//         uint256 value
//     );

//     function totalSupply() external view returns (uint256);

//     function balanceOf(address account) external view returns (uint256);

//     function transfer(address to, uint256 amount) external returns (bool);

//     function allowance(address owner, address spender)
//         external
//         view
//         returns (uint256);

//     function approve(address spender, uint256 amount) external returns (bool);

//     function transferFrom(
//         address from,
//         address to,
//         uint256 amount
//     ) external returns (bool);
// }
