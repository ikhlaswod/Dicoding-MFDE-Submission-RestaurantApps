const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant yang dapat ditampilkan', '.restaurants-item__not__found');
});

Scenario('liking one restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant yang dapat ditampilkan', '.restaurants-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.list-item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant yang dapat ditampilkan', '.restaurants-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  I.click(locate('.restaurant__name a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/');
  I.seeElement('.list-item');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant__name a');
  I.click(locate('.restaurant__name a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');

  I.see('Tidak ada restaurant yang dapat ditampilkan', '.restaurants-item__not__found');
});
