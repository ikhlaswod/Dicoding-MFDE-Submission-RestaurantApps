Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('test something', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant yang dapat ditampilkan', '.restaurants-item__not__found');
});

Scenario('liking one restaurant', ({ I }) => {
  I.see('Tidak ada restaurant yang dapat ditampilkan', '.restaurants-item__not__found');

  I.amOnPage('/');
});
