//SPDX-License-Identifier: MIT

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
    mapping(uint256 => ReferalStruct[]) public monthlyRewardList;
    struct ReferalStruct {
        address userAddress;
        uint256 referalCount;
    }
    address[] public userList;
    address[] queue;
    uint256 front;
    uint256 rear;
    uint256 userLimit;
    uint256 public monthCounter;
    uint256 public monthTimer;
    uint256 public unitLimit;
    uint256 public totalSupply;
    address public owner;
    event WonUnit(address winner, uint256 amount);
    event BuyTicket(address buyer, uint256 amount);
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

    function getMyRefferals(address _account) public view returns (rf memory) {
        return myRefferals[_account];
    }

    function changeOwner(address _newOwner) public {
        require(msg.sender == owner, "only owner can nominate new Owner");
        owner = _newOwner;
    }

    function changeUserLimit(uint256 newLimit) public {
        require(msg.sender == owner, "only owner can nominate new Owner");
        userLimit = newLimit;
    }

    function changeLimit(uint256 _limit) public {
        require(msg.sender == owner, "only owner can change");
        unitLimit = _limit;
    }

    function getQueue() public view returns (address[] memory) {
        require(
            msg.sender == owner || msg.sender == developer,
            "Only owner can access"
        );
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

    function signIn(address _friend, bool _active) public returns (bool) {
        require(msg.sender != _friend);
        require(active[msg.sender] == 0, "Already signed in");
        require(
            ((active[_friend] == 2) ||
                (_friend == 0x0000000000000000000000000000000000000000)),
            "Invalid referal id"
        );
        require(referral[_friend] != msg.sender, "Cant referal each other");
        userList.push(msg.sender);
        referral[msg.sender] = _friend;
        uint8 act = 1;
        if (_active) act = 2;
        active[msg.sender] = act;
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
            _friend = referral[_friend];
        }

        i = 0;
        ReferalStruct memory temp;
        if (
            referral[msg.sender] != 0x0000000000000000000000000000000000000000
        ) {
            for (i = 0; i < monthlyRewardList[monthCounter].length; i++)
                if (
                    referral[msg.sender] ==
                    monthlyRewardList[monthCounter][i].userAddress
                ) break;
            if (monthlyRewardList[monthCounter].length == i)
                monthlyRewardList[monthCounter].push(
                    ReferalStruct(referral[msg.sender], 0)
                );
            else {}
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
        if (_amount != 0) (reserve1, _amount.div(10));
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
            emit WonUnit(queue[front], 12);
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
        require(unitBalance[msg.sender] >= 100, "Not enough UNIT left");
        bool _active = true;
        if (active[msg.sender] == 1) _active = false;
        unitBalance[msg.sender] = unitBalance[msg.sender].sub(100);
        handleLot();
        handleReserves();
        if (_active) handleReferal();
        else reserve1.transfer(1.8 ether);
        IN[msg.sender] = IN[msg.sender].add(1);
        return true;
    }

    function buyUnitToken(uint256 _amount) public payable loggedIn {
        require(msg.value >= _amount.mul(10), "please pay the right amount");
        bool _active = true;
        if (active[msg.sender] == 1) _active = false;
        require(checkUserLimit(_active, _amount), "Maximum user limit reached");
        require(totalSupply <= unitLimit, "Maximum supply limit reached");
        unitBalance[msg.sender] = unitBalance[msg.sender].add(_amount * 100);
        unitCount[msg.sender] = unitCount[msg.sender].add(_amount);
        totalSupply = totalSupply.add(_amount);
    }

    function getMonthStatus() public returns (bool) {
        uint256 diff = (block.timestamp - monthTimer) / 60 / 60 / 24;
        if (diff >= 30) return true;
        else return false;
    }

    function updateMonth() public {
        require(
            msg.sender == owner || msg.sender == developer,
            "Only owner can access"
        );
        require(
            getMonthStatus(),
            "It should be atleast 30 days before you can update the list"
        );
        monthCounter = monthCounter.add(1);
        monthTimer = block.timestamp;
    }

    function getWinners(uint256 _month) public returns (address[] memory) {
        ReferalStruct[] memory newList;
        ReferalStruct[] memory winnerList;
        ReferalStruct memory temp;
        uint256 n = newList.length;
        uint256 i;
        uint256 j;
        for (i = 0; i < n - 1; i++)
            for (j = 0; j < n - i - 1; j++)
                if (newList[j].referalCount > newList[j + 1].referalCount) {
                    temp = newList[j];
                    newList[j] = newList[j + 1];
                    newList[j + 1] = temp;
                }

        for (i = 0; i < 9; i++) winnerList.push(newList[i]);
        return winnerList;
    }

    function getCurrentMonthWinners() public returns (address[] memory) {
        return getWinners(monthCounter);
    }
}

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

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}
