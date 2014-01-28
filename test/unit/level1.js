(function() {
  'use strict';

  // Test selectors allowed per CSS1 spec
  //
  //   http://www.w3.org/TR/CSS1/
  //
  module('CSS1', {
    setup: function() {
      this.fixture = document.getElementById('qunit-fixture');
      this.observer = new SelectorObserver(this.fixture);
    },
    teardown: function() {
      this.observer.disconnect();
    }
  });

  test('add element type selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');

    this.observer.observe('H1', function() {
      equal(this, h1);
      start();
    });
    stop();

    fixture.appendChild(h1);
  });

  test('remove element type selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');

    this.observer.observe('H1', function() {
      fixture.removeChild(h1);

      return function() {
        equal(h1, this);
        start();
      };
    });
    stop();

    fixture.appendChild(h1);
  });

  test('reinsert element type selector', function() {
    expect(3);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');

    var count = 0;
    this.observer.observe('H1', function() {
      count++;
      equal(this, h1);

      if (count === 1) {
        fixture.removeChild(h1);
      } else if (count === 3) {
        start();
      } else {
        ok(false);
      }

      return function() {
        count++;
        equal(this, h1);
        fixture.appendChild(h1);
      };
    });
    stop();

    fixture.appendChild(h1);
  });

  test('add element with class selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');
    h1.className = 'pastoral';

    this.observer.observe('H1.pastoral', function() {
      equal(this, h1);
      start();
    });
    stop();

    fixture.appendChild(h1);
  });

  test('add className with class selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');

    this.observer.observe('H1.pastoral', function() {
      equal(this, h1);
      start();
    });
    stop();

    fixture.appendChild(h1);
    h1.className = 'pastoral';
  });

  test('remove element with class selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');
    h1.className = 'pastoral';

    this.observer.observe('H1.pastoral', function() {
      fixture.removeChild(h1);

      return function() {
        equal(h1, this);
        start();
      };
    });
    stop();

    fixture.appendChild(h1);
  });

  test('change className with class selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');
    h1.className = 'pastoral';

    this.observer.observe('H1.pastoral', function() {
      h1.className = 'sidenote';

      return function() {
        equal(h1, this);
        start();
      };
    });
    stop();

    fixture.appendChild(h1);
  });

  test('change class attribute with class selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');
    h1.className = 'pastoral';

    this.observer.observe('H1.pastoral', function() {
      h1.setAttribute('class', 'sidenote');

      return function() {
        equal(h1, this);
        start();
      };
    });
    stop();

    fixture.appendChild(h1);
  });

  test('add element with id selector', function() {
    expect(1);

    var fixture = this.fixture;
    var p = document.createElement('p');
    p.id = 'z98y';

    this.observer.observe('H1#z98y', function() {
      ok(false);
    });

    this.observer.observe('#z98y', function() {
      equal(this, p);
      start();
    });
    stop();

    fixture.appendChild(p);
  });

  test('change id with id selector', function() {
    expect(1);

    var fixture = this.fixture;
    var p = document.createElement('p');

    this.observer.observe('H1#z98y', function() {
      ok(false);
    });

    this.observer.observe('#z98y', function() {
      equal(this, p);
      start();
    });
    stop();

    fixture.appendChild(p);
    p.id = 'z98y';
  });

  test('remove element with id selector', function() {
    expect(1);

    var fixture = this.fixture;
    var p = document.createElement('p');
    p.id = 'z98y';

    this.observer.observe('#z98y', function() {
      fixture.removeChild(p);

      return function() {
        equal(p, this);
        start();
      };
    });
    stop();

    fixture.appendChild(p);
  });

  test('change id with id selector', function() {
    expect(1);

    var fixture = this.fixture;
    var p = document.createElement('p');
    p.id = 'z98y';

    this.observer.observe('#z98y', function() {
      p.id = 'z98x';

      return function() {
        equal(p, this);
        start();
      };
    });
    stop();

    fixture.appendChild(p);
  });

  test('change id attribute with id selector', function() {
    expect(1);

    var fixture = this.fixture;
    var p = document.createElement('p');
    p.id = 'z98y';

    this.observer.observe('#z98y', function() {
      p.setAttribute('id', 'z98x');

      return function() {
        equal(p, this);
        start();
      };
    });
    stop();

    fixture.appendChild(p);
  });

  test('add element to parent with contextual selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');
    var em = document.createElement('em');

    this.observer.observe('H1 EM', function() {
      equal(this, em);
      start();
    });
    stop();

    fixture.appendChild(h1);
    h1.appendChild(em);
  });

  test('remove child element from parent with contextual selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');
    var em = document.createElement('em');

    this.observer.observe('H1 EM', function() {
      h1.removeChild(em);

      return function() {
        equal(this, em);
        start();
      };
    });
    stop();

    fixture.appendChild(h1);
    h1.appendChild(em);
  });

  test('remove parent element with contextual selector', function() {
    expect(1);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');
    var em = document.createElement('em');

    this.observer.observe('H1 EM', function() {
      fixture.removeChild(h1);

      return function() {
        equal(this, em);
        start();
      };
    });
    stop();

    fixture.appendChild(h1);
    h1.appendChild(em);
  });

  test('group tag selectors', function() {
    expect(4);

    var fixture = this.fixture;
    var h1 = document.createElement('h1');
    var h2 = document.createElement('h2');

    var count = 0;
    this.observer.observe('H1, H2, H3', function() {
      count++;
      if (count === 1) {
        equal(this, h1);
        fixture.removeChild(h1);
      } else if (count === 2) {
        equal(this, h2);
        fixture.removeChild(h2);
      } else {
        ok(false);
      }

      return function() {
        count++;
        if (count === 3) {
          equal(h1, this);
        } else if (count === 4) {
          equal(h2, this);
        } else {
          ok(false);
        }
        start();
      };
    });
    stop();
    stop();

    fixture.appendChild(h1);
    fixture.appendChild(h2);
  });

  function createFrame(fixture) {
    var iframe = document.createElement('iframe');
    fixture.appendChild(iframe);
    var frameDocument = iframe.contentDocument;
    var body = frameDocument.body;
    if (!body) {
      body = frameDocument.createElement('body');
      frameDocument.appendChild(body);
    }
    return frameDocument;
  }

  test('add element to iframe', function() {
    expect(1);

    var doc = createFrame(this.fixture);
    var observer = new SelectorObserver(doc.body);

    var h1 = doc.createElement('h1');

    observer.observe('H1', function() {
      equal(this, h1);
      observer.disconnect();
      start();
    });
    stop();

    doc.body.appendChild(h1);
  });
})();
