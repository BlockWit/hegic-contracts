## Experiment 1
Hegic contracts deployed 'as is'.

### Ropsten
* [HegicCallOptions](https://ropsten.etherscan.io/address/0x2eA0aC3bE2C8248E0e608f0dDA5268dD39f1FBD2#code)
* [HegicPutOptions](https://ropsten.etherscan.io/address/0x4046731B841bd949955c845333698ac8bA777567#code)
* [FakeExchange](https://ropsten.etherscan.io/address/0xEbe3E31D46ffA35Bc403e10bd525Ce8b3C14A00E#code)
* [FakePriceProvider](https://ropsten.etherscan.io/address/0x2b1431a3C45a47a8D3574D7ec04D8Ee8D4853970#code)
* [FakeUSD](https://ropsten.etherscan.io/address/0x810135aB23E6FC4496d2D333a7FefcD03d0D8740#code)

<details><summary>Deployment details</summary>

##### FakeUSD
```
> transaction hash:    0x215a08943a488ae0f9b30c7796c0aa5df1e4efb6e686bab8126e085969d0ee60
> Blocks: 1            Seconds: 33
> contract address:    0x810135aB23E6FC4496d2D333a7FefcD03d0D8740
> block number:        9622850
> block timestamp:     1612779710
> account:             0xf62158b03Edbdb92a12c64E4D8873195AC71aF6A
> balance:             2.625738040630046407
> gas used:            761745 (0xb9f91)
> gas price:           20 gwei
> value sent:          0 ETH
> total cost:          0.0152349 ETH
```
##### FakePriceProvider
```
> transaction hash:    0xfba602841eaa090efec3b54ed93f5c6ad558606d8d074ea21e6f950109abd7fb
> Blocks: 0            Seconds: 5
> contract address:    0x2b1431a3C45a47a8D3574D7ec04D8Ee8D4853970
> block number:        9622852
> block timestamp:     1612779725
> account:             0xf62158b03Edbdb92a12c64E4D8873195AC71aF6A
> balance:             2.623414940630046407
> gas used:            116155 (0x1c5bb)
> gas price:           20 gwei
> value sent:          0 ETH
> total cost:          0.0023231 ETH
```

##### FakeExchange
```
> transaction hash:    0xf05456c120d57f4795d130a8ed17516125af71f32163aa1a7de5b454ed9e95b5
> Blocks: 0            Seconds: 8
> contract address:    0xEbe3E31D46ffA35Bc403e10bd525Ce8b3C14A00E
> block number:        9622853
> block timestamp:     1612779734
> account:             0xf62158b03Edbdb92a12c64E4D8873195AC71aF6A
> balance:             2.614631260630046407
> gas used:            439184 (0x6b390)
> gas price:           20 gwei
> value sent:          0 ETH
> total cost:          0.00878368 ETH
```

##### HegicPutOptions
```
> transaction hash:    0x49c04b166c1b005fa059c81ce6dc399fd86cb4cfc49d4c8481407f224a0d3ccb
> Blocks: 1            Seconds: 32
> contract address:    0x4046731B841bd949955c845333698ac8bA777567
> block number:        9622856
> block timestamp:     1612779759
> account:             0xf62158b03Edbdb92a12c64E4D8873195AC71aF6A
> balance:             2.536562260630046407
> gas used:            3903450 (0x3b8fda)
> gas price:           20 gwei
> value sent:          0 ETH
> total cost:          0.078069 ETH
```

##### HegicCallOptions
```
> transaction hash:    0x417ad88a8825d566ff25c773c29343b4d0e50c85ac179d6c4b21ab1844f1d9b4
> Blocks: 0            Seconds: 8
> contract address:    0x2eA0aC3bE2C8248E0e608f0dDA5268dD39f1FBD2
> block number:        9622857
> block timestamp:     1612779788
> account:             0xf62158b03Edbdb92a12c64E4D8873195AC71aF6A
> balance:             2.469236480630046407
> gas used:            3366289 (0x335d91)
> gas price:           20 gwei
> value sent:          0 ETH
> total cost:          0.06732578 ETH
```

</details><br>

#### Interacting with the CallOptions contract
##### Prepairing
1. Deploy contracts. PriceProvider deployed with price set to `200e8`.
    >Price is the number of tokens per eth
2. Provide liquidity to HegicETHPool using `provide(uint256 minMint)` method. [transaction](https://ropsten.etherscan.io/tx/0x0b618dba99f33308a4d49be88d50ccbbf2b78242b68fa23e52f76c10b54edbbf)  
Set `value` to `2 Eth`, `minMint` to `1`. 
    > `1.25 Eth` should be enough to provide `1 Eth` for locking.  
    `2,000 writeETH` minted.

##### Case 1: Holder tries to exercise call option when price falls
1. Buy call option using `create` method. [transaction](https://ropsten.etherscan.io/tx/0x1b1d97dccac692b4eefec75642e1040c53f08948cafd02ba8a7da4c4ef1c62b1)  
Set `value` to `0.016115 Eth`, `amount` to `1e18`, `period` to `864000`, strike to `200e8`.
    > `settlementFee` should be equal to `amount/100` = `1e16 Wei`.
2. Set price within PriceProvider to `150e8`. [transaction](https://ropsten.etherscan.io/tx/0x6ad9a31e6803f0ef5f378ad8104f918c003fe68137c77b3f1346633c2f32480b)
3. Call `exercise` method from holder's account. [transaction](https://ropsten.etherscan.io/tx/0x9ea45b4f789e29629c01f0e43aa2df3cd6af2d02cf3fd997921e1605f9b78cb8)
    > Transaction reverted with error 'Current price is too low'

##### Case 2: Holder exercises call option when price grows
1. Using the option from the [case 1](#case-1-holder-tries-to-exercise-call-option-when-price-falls). [transaction](https://ropsten.etherscan.io/tx/0x1b1d97dccac692b4eefec75642e1040c53f08948cafd02ba8a7da4c4ef1c62b1)  
    > `value` set to `0.016115 Eth`, `amount` to `1e18`, `period` to `864000`, strike to `200e8`.
2. Set price within PriceProvider to `250e8`. [transaction](https://ropsten.etherscan.io/tx/0x91ed295085e2d933c7bc74a70770b2f046ef7ae139df161fc13903e5cc1b4011)
3. Call `exercise` method from holder's account. [transaction](https://ropsten.etherscan.io/tx/0x1848c21d846704ddfef686ccfb5a817f9e3ef7ae9afdd9e47f52f64b3fccf6bf)
    > `0.2 Eth` sent to the holder's account.


#### Interacting with the PutOptions contract
##### Prepairing
1. Deploy contracts. PriceProvider deployed with price set to `200e8`.
    > Price is the number of tokens per eth
2. Mint `1000 FakeUSD`. [transaction](https://ropsten.etherscan.io/tx/0x8e4f93a57d6f57e2d6ecc10341c0f52fd856f4314ba3cfc969b393a8fa0450c3)
3. Increase allowance so ERCPoll can use your tokens. [transaction](https://ropsten.etherscan.io/tx/0xcf998e094fb2844ba7636787ee9f6fbcdfe5f949b9ef128ee3559dae78acdec4)  
Set `spender` to `0xD1CCE455d134A9872d634D7BeEe023322a88A`, `addedValue` to `1000e18`.
4. Provide liquidity to HegicERCPool using `provide(uint256 minMint)` method. [transaction](https://ropsten.etherscan.io/tx/0x342a2d866c25bade7ce033120e36474818281e6b2b5a1b2c47653dd42a323a66)  
Set `value` to `1000e18`, `minMint` to `1`. 
    > `1000 FakeUSD` transferred to liquidity pool.  
    `1,000,000 writeDAI` minted.

##### Case 1: Holder exercises option when price falls
1. Buy call option using `create` method. [transaction](https://ropsten.etherscan.io/tx/0x49a8c83689c082a0b41f8ac93a8f7c79c2eef520b4d6c0187fe2d7f5f05f42e2)
Set `value` to `0.016115 Eth`, `amount` to `1e18`, `period` to `864000`, strike to `200e8`.
2. Set price within PriceProvider to `150e8`. [transaction](https://ropsten.etherscan.io/tx/0xfca6ca97bb307e177d521d2c997120e5565def7a0ecd8b2b2e810c61b8d8e006)
3. Call `exercise` method from holder's account. [transaction](https://ropsten.etherscan.io/tx/0x66808ab76fc9624c9d4e4a5f62334e21b64de49caf6587f8e380c610c9078af3)
    > `50 FakeUSD` transferred to the holder.
