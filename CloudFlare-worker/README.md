# Cloudflare Worker - GitHub Repository Card Generator

This Cloudflare Worker generates beautiful, customizable repository cards that can be embedded in your README files or websites. It creates SVG images on-the-fly based on the provided parameters.

## 🚀 Features

- 🎨 Generate beautiful repository cards as SVG images
- 🌓 Supports both light and dark themes
- 🎨 Fully customizable colors and styling
- ⚡ Edge-deployed for fast global access
- 🔒 No server setup required

## 🛠️ Deployment to Cloudflare Workers

### Prerequisites

1. A Cloudflare account (free tier available)
2. Node.js and npm installed on your machine
3. Cloudflare Wrangler CLI installed

### Installation

1. Install Wrangler CLI if you haven't already:
   ```bash
   npm install -g wrangler
   ```

2. Login to your Cloudflare account:
   ```bash
   wrangler login
   ```

### Deployment

1. Navigate to the CloudFlare-worker directory:
   ```bash
   cd CloudFlare-worker
   ```

2. Deploy the worker:
   ```bash
   wrangler deploy
   ```

3. Follow the prompts to create a new worker or update an existing one.

## 🌐 API Usage

Once deployed, you can use the worker by making GET requests to your worker's URL with the following parameters:

### Required Parameters

| Parameter | Type   | Description                          |
|-----------|--------|--------------------------------------|
| `name`    | string | Name of the repository               |
| `desc`    | string | Description of the repository        |

### Optional Parameters

| Parameter        | Type    | Description                                      | Default     |
|------------------|---------|--------------------------------------------------|-------------|
| `lang`           | string  | Programming language                             | 'Unknown'   |
| `theme`          | string  | Color theme ('light' or 'dark')                  | 'dark'      |
| `bg_color`       | string  | Background color (hex code)                      | Theme-based |
| `text_color`     | string  | Text color (hex code)                            | Theme-based |
| `muted_color`    | string  | Muted text color (hex code)                      | Theme-based |
| `accent_color`   | string  | Accent color (hex code)                          | Theme-based |
| `secondary_accent`| string | Secondary accent color (hex code)                | Theme-based |
| `stars`          | number  | Number of stars                                  | Hidden      |
| `forks`          | number  | Number of forks                                  | Hidden      |
| `issues`         | number  | Number of open issues                            | Hidden      |

### Example Usage

```markdown
![Repository Card](https://your-worker.your-subdomain.workers.dev/pin?name=github-repocard-generator&desc=A%20beautiful%20GitHub%20repository%20card%20generator&lang=JavaScript&theme=dark&stars=42&forks=7&issues=2)
```

## 🎨 Customization

You can customize the appearance of your cards using the following color parameters:

- `bg_color`: Background color
- `text_color`: Main text color
- `muted_color`: Secondary text color
- `accent_color`: Primary accent color
- `secondary_accent`: Secondary accent color

Example with custom colors:
```
https://your-worker.workers.dev/pin?name=MyRepo&desc=Amazing%20Project&bg_color=1a1a1a&text_color=ffffff&accent_color=00ff88
```

## 🔄 Updating the Worker

To update your worker after making changes:

```bash
wrangler deploy
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
