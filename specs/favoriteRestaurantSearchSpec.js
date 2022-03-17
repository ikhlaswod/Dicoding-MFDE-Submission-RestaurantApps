import FavoriteRestaurantSearchPresenter
  from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching restaurants', () => {
  let presenter;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
    <div id="restaurant-search-container">
        <input id="query" type="text">
        <div class="restaurant-result-container">
            <ul class="restaurants">
            </ul>
        </div>
    </div>
    `;
  };

  const constructorPresenter = () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurants');
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants: FavoriteRestaurantIdb,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructorPresenter();
  });

  it('should be able to capture the query typed by the user', () => {
    searchRestaurants('restaurant a');

    expect(presenter.latesQuery)
      .toEqual('restaurant a');
  });

  it('should ask the model to search for liked restaurants', () => {
    searchRestaurants('restaurant a');

    expect(FavoriteRestaurantIdb.searchRestaurants)
      .toHaveBeenCalledWith('restaurant a');
  });

  it('should show the found restaurants', () => {
    presenter._showFoundRestaurants([
      { id: 1 },
    ]);
    expect(document.querySelectorAll('.restaurant').length)
      .toEqual(1);

    presenter._showFoundRestaurants([
      { id: 1, name: 'Alteon Restaurant 1' },
      { id: 1, name: 'Alteon Restaurant 2' },
    ]);
    expect(document.querySelectorAll('.restaurant').length)
      .toEqual(2);
  });

  it('should show the name of the found restaurants', () => {
    presenter._showFoundRestaurants([
      { id: 1, name: 'Alteon 1' },
      { id: 1, name: 'Alteon 2' },
    ]);
    expect(document.querySelectorAll('.restaurant__name').item(0).textContent)
      .toEqual('Alteon 1');
    expect(document.querySelectorAll('.restaurant__name').item(1).textContent)
      .toEqual('Alteon 2');
  });

  it('should show - for found restaurant without name', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);

    expect(document.querySelectorAll('.restaurant__name').item(0).textContent)
      .toEqual('-');
  });

  it('should show the found restaurants by Favorite Restaurants', (done) => {
    document.getElementById('restaurant-search-container')
      .addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(3);
        done();
      });

    FavoriteRestaurantIdb.searchRestaurants.withArgs('restaurant abc').and.returnValues([
      { id: 111, name: 'restaurant a' },
      { id: 222, name: 'restaurant b' },
      { id: 333, name: 'restaurant c' },
    ]);

    searchRestaurants('restaurant abc');
  });

  it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
    document.getElementById('restaurant-search-container')
      .addEventListener('restaurants:searched:updated', () => {
        const restaurantName = document.querySelectorAll('.restaurant__name');
        expect(restaurantName.item(0).textContent).toEqual('restaurant a');
        expect(restaurantName.item(1).textContent).toEqual('restaurant b');
        expect(restaurantName.item(2).textContent).toEqual('restaurant c');

        done();
      });

    FavoriteRestaurantIdb.searchRestaurants.withArgs('restaurant abc').and.returnValues([
      { id: 111, name: 'restaurant a' },
      { id: 222, name: 'restaurant b' },
      { id: 333, name: 'restaurant c' },
    ]);

    searchRestaurants('restaurant abc');
  });
});
