type Product = {
    productName:string,
    total:number
}
let map = new Map<string,Product>([
    ["1",{productName:"a",total:8}],
    ["2",{productName:"b",total:12}],
    ["3",{productName:"a",total:1}],
    ["4",{productName:"c",total:3}],
    ["5",{productName:"b",total:4}],
    ["6",{productName:"a",total:4}],
    ["7",{productName:"c",total:4}],
])

/**
 * not a pretty solution, following the logic I used on monday. 
 * If the product doesnt exist in the map, add it, if it does, sum the total.
 * I now realize using a set was incorrect
 * return [product,sum]
 */
function getSum(map:Map<string,Product>){
    let set = new Map<string,number>()
    const k = Array.from( map.keys() );
    for(let i = 0;i<map.size;i++){
      const product = map.get(k[i])!
      if(!set.has(product.productName)){
        set.set(product.productName,product.total)
      }
      else{
        let p1 = set.get(product.productName)!
        let total = product.total + p1
        set.set(product.productName,total)
      }
    }
    console.log(set)// { a → 13, b → 16, c → 7 }
    return set
  }

function getSumPretty(map: Map<string, Product>) {
    const set = new Map<string, number>();

    for (const p of map.values()) {
        set.set(p.productName, (set.get(p.productName) || 0) + p.total);
    }

    console.log(set); // { a → 13, b → 16, c → 7 }
    return set;
}

getSum(map)
getSumPretty(map)