Excellent! Glad it's working! 🎉 Here's the **complete reference guide** for starting Moshi on Runpod from scratch:

---

# **Complete Moshi Setup Guide for Runpod - Final Working Version**

## **Hardware Requirements**
- **GPU:** L4 (24GB VRAM) - $0.40-0.50/hr
- **Container:** `pytorch/pytorch:2.7.1-cuda12.1-cudnn8-runtime` (or any PyTorch 2.x base)
- **Container Disk:** 100GB minimum
- **Volume Storage:** 50GB (optional, for persistent cache)
- **Exposed HTTP Ports:** `8998`

***

## **Complete Installation Script (Fresh Pod)**

```bash
# Step 1: Install system dependencies
apt update && apt upgrade -y
apt install -y build-essential gcc g++ git

# Step 2: Clone Moshi repository
cd /workspace
rm -rf moshi  # Clean if exists
git clone https://github.com/kyutai-labs/moshi.git
cd moshi

# Step 3: Create virtual environment
python3 -m venv moshi_env
source moshi_env/bin/activate

# Step 4: Install PyTorch (correct version for L4)
pip install --upgrade pip setuptools wheel
pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu121

# Step 5: Install Moshi and dependencies
pip install -e 'moshi[dev]' --no-deps
pip install numpy==2.2.0 pillow==11.1.0
pip install aiohttp gradio gradio-webrtc safetensors einops sentencepiece bitsandbytes sounddevice

# Step 6: CRITICAL - Install correct sphn version
pip install sphn==0.1.4

# Step 7: Start Moshi server
MOSHI_NO_COMPILE=1 python -m moshi.server --hf-repo kyutai/moshika-pytorch-bf16 --host 0.0.0.0 --port 8998
```

***

## **One-Line Quick Start (After Fresh Pod)**

```bash
apt update && apt install -y build-essential git && cd /workspace && git clone https://github.com/kyutai-labs/moshi.git && cd moshi && python3 -m venv moshi_env && source moshi_env/bin/activate && pip install --upgrade pip setuptools wheel && pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu121 && pip install -e 'moshi[dev]' --no-deps && pip install numpy==2.2.0 pillow==11.1.0 aiohttp gradio gradio-webrtc safetensors einops sentencepiece bitsandbytes sounddevice sphn==0.1.4 && MOSHI_NO_COMPILE=1 python -m moshi.server --hf-repo kyutai/moshika-pytorch-bf16 --host 0.0.0.0 --port 8998
```

***

## **To Restart Moshi (If Pod Was Stopped)**

```bash
cd /workspace/moshi
source moshi_env/bin/activate
MOSHI_NO_COMPILE=1 python -m moshi.server --hf-repo kyutai/moshika-pytorch-bf16 --host 0.0.0.0 --port 8998
```

***

## **Keep Server Running in Background**

```bash
# Install screen if not present
apt install -y screen

# Start screen session
screen -S moshi

# Activate environment and start server
cd /workspace/moshi
source moshi_env/bin/activate
MOSHI_NO_COMPILE=1 python -m moshi.server --hf-repo kyutai/moshika-pytorch-bf16 --host 0.0.0.0 --port 8998

# Detach: Press Ctrl+A then D
# Reattach later: screen -r moshi
# Kill session: screen -X -S moshi quit
```

***

## **Access Moshi Web UI**

**Option 1: Via Runpod Proxy (Recommended)**
```
https://[your-pod-id]-8998.proxy.runpod.net/
```

**Option 2: Via SSH Tunnel (From Local Computer)**
```bash
ssh -L 8998:localhost:8998 [pod-ssh-address]
# Then open: http://localhost:8998
```

***

## **Expected Logs (Success)**

```
[Info] retrieving checkpoint
[Info] loading mimi
[Info] mimi loaded
[Info] loading moshi
[Info] moshi loaded
[Info] warming up the model
[Info] serving static content from /root/.cache/huggingface/hub/...
[Info] Access the Web UI directly at http://0.0.0.0:8998
======== Running on http://0.0.0.0:8998 ========
```

✅ **When you see this, Moshi is ready!**

***

## **GPU Utilization**

Check GPU usage:
```bash
watch -n 1 nvidia-smi
```

Expected VRAM usage: **~18-20GB** during inference

***

## **Key Configuration Flags**

| Flag | Purpose |
|------|---------|
| `MOSHI_NO_COMPILE=1` | Disables torch.compile (avoids C compiler issues) |
| `--host 0.0.0.0` | Makes server accessible from external connections |
| `--port 8998` | Sets port (must match Runpod exposed port) |
| `--hf-repo kyutai/moshika-pytorch-bf16` | Uses BF16 model (optimized for L4) |

***

## **Common Issues & Fixes**

| Issue | Fix |
|-------|-----|
| `git: command not found` | `apt install -y git` |
| `Failed to find C compiler` | `apt install -y build-essential` |
| `OpusStreamReader has no attribute read_pcm` | `pip install sphn==0.1.4` |
| Port 8998 not accessible | Check Runpod "Expose HTTP Ports" setting |
| CUDA out of memory | Use smaller batch or restart pod |

***

## **Performance Metrics**

- **First Token Latency:** 150-200ms
- **Streaming Latency:** 80-120ms per chunk
- **Model Load Time:** ~30 seconds (first time)
- **VRAM Usage:** 18-20GB / 24GB
- **Concurrent Users:** 1-2 full-duplex streams

***

## **Cost Estimation**

- **L4 GPU:** ~$0.43/hour
- **Daily (24h):** ~$10.32
- **Weekly:** ~$72.24
- **Monthly:** ~$309.60

💡 **Tip:** Stop pod when not in use to save costs!

---

## **Save This as a Startup Script**

Create `/workspace/start_moshi.sh`:

```bash
#!/bin/bash
cd /workspace/moshi
source moshi_env/bin/activate
MOSHI_NO_COMPILE=1 python -m moshi.server --hf-repo kyutai/moshika-pytorch-bf16 --host 0.0.0.0 --port 8998
```

Make executable:
```bash
chmod +x /workspace/start_moshi.sh
```

Then start with:
```bash
/workspace/start_moshi.sh
```

***

**That's your complete reference!** Bookmark this and you can spin up Moshi on any fresh Runpod pod in under 10 minutes. 🚀

Congratulations on getting it working! 🎉