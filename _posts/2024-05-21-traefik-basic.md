

## Traefik Overview ( WIP )

Traefik is a reverse proxy and load balancer designed for microservices. It integrates seamlessly with various orchestration tools like Docker, Kubernetes, and others, automatically detecting services and routing traffic to them based on configured rules. Traefik supports various protocols including HTTP, HTTPS, and TCP, and offers features such as SSL termination, load balancing, and more.

### How Traefik Works

1. **Service Discovery**: Traefik can automatically discover services using providers like Docker. It listens for changes in the service registry and updates its routing configuration accordingly.
2

## Traefik Overview

Traefik is a modern reverse proxy and load balancer designed for microservices. It can integrate seamlessly with various orchestrators such as Docker, Kubernetes, and others. It automatically discovers services and routes traffic to them based on configured rules. Traefik supports multiple protocols, including HTTP, HTTPS, and TCP, and offers features like SSL termination, load balancing, and more.

### How Traefik Works

1. **Service Discovery**: Traefik automatically discovers services using various providers like Docker, Kubernetes, etc. It listens for changes in the service registry and updates its routing configuration dynamically.
2. **Routing**: Based on defined rules, Traefik routes incoming requests to the appropriate backend services. These rules can be configured using labels in Docker, annotations in Kubernetes, or through a configuration file.
3. **Middlewares**: Traefik uses middlewares to modify requests before they reach your services. Common middlewares include authentication, rate limiting, and request rewriting.
4. **Load Balancing**: Traefik can distribute requests across multiple instances of a service, balancing the load and providing high availability.

## Using Traefik with Docker Compose

To use Traefik with Docker Compose, follow these steps:

1. **Create a Docker Compose File**: Define your services and add Traefik as a reverse proxy.

2. **Add Traefik Labels**: Use labels to configure Traefik for your services.

### Example Docker Compose File

Here’s a detailed example:

```yaml
version: '3.7'

services:
  traefik:
    image: traefik:v2.9
    command:
      - "--api.insecure=true" # Enables the Traefik dashboard on port 8080
      - "--providers.docker=true" # Enables Docker as a provider
      - "--entrypoints.web.address=:80" # Defines an entrypoint on port 80
    ports:
      - "80:80" # HTTP
      - "8080:8080" # Traefik Dashboard
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock" # Allows Traefik to access Docker

  whoami:
    image: containous/whoami # A simple web server that returns information about the request
    labels:
      - "traefik.enable=true" # Enable Traefik for this container
      - "traefik.http.routers.whoami.rule=Host(`whoami.localhost`)" # Routing rule
      - "traefik.http.services.whoami.loadbalancer.server.port=80" # Service port
```

### Explanation of Labels

#### Basic Labels
- **traefik.enable=true**: This label enables Traefik for the specific container.
- **traefik.http.routers.[router-name].rule=Host(`your.domain.com`)**: Defines a routing rule. Replace `[router-name]` with a unique name and `your.domain.com` with the desired domain.
- **traefik.http.services.[service-name].loadbalancer.server.port=[port]**: Specifies the port Traefik should use to route traffic to the container. Replace `[service-name]` with a unique name and `[port]` with the container's exposed port.

#### Advanced Labels
- **traefik.http.middlewares.[middleware-name].basicauth.users=[user:password]**: Configures basic authentication. Replace `[middleware-name]` with a unique name and `[user:password]` with a valid username and password in htpasswd format.
- **traefik.http.routers.[router-name].middlewares=[middleware-name]**: Attaches a middleware to a router. Replace `[router-name]` and `[middleware-name]` with the appropriate names.

### Complete Example with Middleware

```yaml
version: '3.7'

services:
  traefik:
    image: traefik:v2.9
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"

  myservice:
    image: myimage
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.myservice.rule=Host(`myservice.localhost`)"
      - "traefik.http.services.myservice.loadbalancer.server.port=80"
      - "traefik.http.middlewares.myservice-auth.basicauth.users=user:$$apr1$$DyeYjZnA$$K9gOZH5z0QbJYOeDPOw1g/" # Basic auth user:password
      - "traefik.http.routers.myservice.middlewares=myservice-auth"
```

### Explanation

- **traefik** service:
  - Runs Traefik with the Docker provider enabled.
  - Exposes port 80 for HTTP traffic and port 8080 for the Traefik dashboard.
  - Mounts the Docker socket to allow Traefik to detect other containers.

- **myservice**:
  - A custom service with Traefik enabled.
  - Routes requests with the hostname `myservice.localhost` to this service.
  - Configures basic authentication using middleware.

### Summary

- **Traefik Labels**: Used to configure how Traefik handles traffic for each container.
- **Basic Configuration**: Includes enabling Traefik, defining routers, and specifying service ports.
- **Advanced Configuration**: Includes setting up middlewares for additional functionalities like authentication.

