import FavoriteRestaurantSearchPresenter
  from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;

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
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructorPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restaurant a');

      expect(presenter.latesQuery)
        .toEqual('restaurant a');
    });

    it('should ask the model to search for restaurants', () => {
      searchRestaurants('restaurant a');

      expect(favoriteRestaurants.searchRestaurants)
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

      favoriteRestaurants.searchRestaurants.withArgs('restaurant abc').and.returnValues([
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

      favoriteRestaurants.searchRestaurants.withArgs('restaurant abc').and.returnValues([
        { id: 111, name: 'restaurant a' },
        { id: 222, name: 'restaurant b' },
        { id: 333, name: 'restaurant c' },
      ]);

      searchRestaurants('restaurant abc');
    });
  });

  describe('When query is empty', () => {
    it('should capture when the query is empty', () => {
      searchRestaurants(' ');
      expect(presenter.latesQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latesQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latesQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latesQuery.length).toEqual(0);
    });
    it('should show all favorite movies', () => {
      searchRestaurants('     ');
      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurants__not__found').length)
            .toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

      searchRestaurants('restaurant a');
    });
    it('should not show any movie', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length)
            .toEqual(0);
          done();
        });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

      searchRestaurants('restaurant a');
    });
  });
});
