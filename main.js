const app = new Vue({
	el: '#app',
	data: {
		data: [],
		search: ''
	},
	computed: {
		filteredCoins: function() {
		console.log(this.data);
    if (!this.search) return this.data
			return this.data.filter((coin) => {
				return coin.name.toLowerCase().includes(this.search.toLowerCase());
			})
      .sort(coinsByRank);
		}
	},
	created () {
		fetch('https://api.coinmarketcap.com/v2/ticker/')
			.then(response => response.json())
			.then(json => {
				this.data = Object.values(json.data).sort(coinsByRank);
			})
	}
})

function coinsByRank(c1, c2) {
  if (c1.rank < c2.rank) {
      return -1;
    }
    else if (c1.rank === c2.rank) {
      return 0;
    }
  else if (c1.rank > c2.rank) {
    return 1;
  }
}