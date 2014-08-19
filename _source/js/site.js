(function () {
    var eventBindings = {
        'click': {
            '.workItem': function (e, closest) {
                var parentClasses = closest.classList;
                if (parentClasses.contains('expanded')) {
                    parentClasses.remove('expanded');
                } else {
                    parentClasses.add('expanded');
                    var order = closest.dataset.order;
                    //closest.style.order -= 2;
                }
            }
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        // set up event bindings
        for (var prop in eventBindings) {
            for (var tgt in eventBindings[prop]) {
                document.addEventListener(prop, function (e) {
                    var parent = e.target.parentNode;
                    var comparator = e.target;

                    // walk up dom tree seeking matching element
                    while (parent != null) {
                        var matches = parent.querySelectorAll(tgt);
                        var match = null;
                        for (var i=0; i<matches.length; i++) {
                            if (matches[i] === comparator) {
                                match = comparator;
                                break;
                            }
                        }
                        if (match != null) {
                            eventBindings[prop][tgt](e, comparator);
                            break;
                        } else {
                            comparator = parent;
                            parent = parent.parentNode;
                        }
                    }
                });
            }
        }
    });
}());