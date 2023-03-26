function universalis(itemname, datacenter, hqonly, returntype) {
  // Look up the item ID using the XIVAPI
  var url = 'https://xivapi.com/search';
  var params = {
    'indexes': 'Item',
    'string': itemname,
    'columns': 'ID',
    'limit': 1
  };
  var response = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true,
    method: 'get',
    payload: params,
    validateHttpsCertificates: false
  });
  var json = response.getContentText();
  var data = JSON.parse(json);
  var results = data.Results;
  if (results.length > 0) {
    var itemid = results[0].ID;
    // Query the Universalis API for sale listings
    var url = 'https://universalis.app/api';
    var params = {
      'world': datacenter,
      'item': itemid,
      'entries': 1,
      'hq': hqonly ? '1' : '0'
    };
    var response = UrlFetchApp.fetch(url + '/market/' + itemid, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      },
      muteHttpExceptions: true,
      method: 'get',
      payload: params,
      validateHttpsCertificates: false
    });
    var json = response.getContentText();
    var data = JSON.parse(json);
    var results = data.listings;
    if (results.length > 0) {
      var cheapest = results[0];
      for (var i = 1; i < results.length; i++) {
        if (results[i].pricePerUnit < cheapest.pricePerUnit) {
          cheapest = results[i];
        }
      }
      if (returntype === 'price') {
        return cheapest.pricePerUnit;
      } else {
        return cheapest.worldName;
      }
    }
  }
  return null;
}

function UNIVERSALIS(itemname, datacenter, hqonly, returntype) {
  // Random delay to comply with API access rate limitations
  Utilities.sleep(Math.floor(Math.random() * 5000) + 1000);
  var cheapest = universalis(itemname, datacenter, hqonly, returntype);
  if (cheapest) {
    return cheapest;
  } else {
    return 'No results found';
  }
}