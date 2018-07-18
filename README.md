# api-double

api-double serving via HTTP or other means

See <https://github.com/hashicorp/consul-api-double/> for an example of an api-double.

'Templates' use simple native javascript template literals for very basic looping and basic logic for providing fake data.

## Wildcard templates

To provide a double for `/v1/health/service/:name`

Create a `/v1/health/service/_` template file. This will be used for `/v1/health/service/*`. Within the template the `*` will be in `location.segment(3)`

Further configuration will be provided by a `/v1/health/service/.config` file or similar as and when needed.

## Extra template helpers:

Right now very subject to change. But the idea is to keep them as minimal as possible and just rely on `faker`, plus helpers to get things you need for doing stuff like this (easy way to loop, access to url params and headers)

### range(int)

Simple range function for creating loops

```javascript
[
    ${
        range(100000).map(
            item => {
                return `"service-${item}"`;
            }
        );
    }
]
// yields
[
    "service-1",
    ...,
    "service-100000"
]
```

### fake

Object containing access to various [`faker` functions](https://github.com/marak/Faker.js/#api-methods)

```javascript
[
    ${
        range(100000).map(
            item => {
                return `${fake.address.countryCode().toLowerCase()-${item}}`;
            }
        );
    }
]
// yields
[
    "it-1",
    ...,
    "de-100000"
]
```

### location.pathname

Reference to the current url

```javascript
// /v1/catalog/datacenters
[
    "${location.pathname}"
]
// yields
[
    "/v1/catalog/datacenters"
]
```
### location.pathname.get(int)

Reference a 'segment' in the current url

```javascript
// /v1/catalog/datacenters
[
    "${location.pathname.get(1)}"
]
// yields
[
    "catalog"
]
```

