import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../services/chatbot.service';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chatbot-container" [class.open]="isOpen">
      <!-- Toggle Button -->
      <button (click)="toggleChat()" class="chat-toggle btn btn-primary rounded-circle shadow-lg border-2 border-white">
        <i class="bi" [ngClass]="isOpen ? 'bi-x-lg' : 'bi-chat-dots-fill'"></i>
      </button>

      <!-- Chat Window -->
      <div class="chat-window shadow-xl border-0 rounded-4 overflow-hidden" *ngIf="isOpen">
        <div class="chat-header bg-primary text-white p-3 d-flex align-items-center">
          <i class="bi bi-robot me-2 fs-5"></i>
          <div class="flex-grow-1">
            <h6 class="mb-0 fw-bold">Smart Assistant</h6>
            <small class="opacity-75">Online • AI Powered</small>
          </div>
        </div>

        <div class="chat-body p-3" #chatBody>
          <div *ngFor="let msg of messages" class="mb-3 d-flex" [ngClass]="msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'">
            <div class="message-bubble p-3 rounded-4 shadow-xs" 
                 [ngClass]="msg.sender === 'user' ? 'bg-primary text-white rounded-bottom-right-0' : 'bg-light text-dark rounded-bottom-left-0'">
              {{ msg.text }}
            </div>
          </div>
          <div *ngIf="isTyping" class="text-muted small ms-2 mb-3">
              <span class="spinner-grow spinner-grow-sm me-1"></span> Assistant is thinking...
          </div>
        </div>

        <div class="chat-footer p-3 bg-white border-top">
          <div class="input-group">
            <input type="text" class="form-control border-0 bg-light-soft rounded-pill-start px-3" 
                   [(ngModel)]="userInput" (keyup.enter)="sendMessage()" placeholder="Ask about mileage, SUVs...">
            <button class="btn btn-primary rounded-pill-end px-3" (click)="sendMessage()">
              <i class="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-container { position: fixed; bottom: 30px; right: 30px; z-index: 1060; }
    .chat-toggle { width: 60px; height: 60px; font-size: 1.5rem; transition: all 0.3s ease; }
    .chat-window { position: absolute; bottom: 80px; right: 0; width: 350px; height: 500px; display: flex; flex-direction: column; background: white; transform-origin: bottom right; animation: scaleUp 0.3s ease-out; }
    @keyframes scaleUp { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .chat-body { flex-grow: 1; overflow-y: auto; background: #fcfdfe; }
    .message-bubble { max-width: 80%; font-size: 0.95rem; line-height: 1.4; }
    .bg-light-soft { background-color: #f1f4f9; }
    .rounded-bottom-right-0 { border-bottom-right-radius: 0 !important; }
    .rounded-bottom-left-0 { border-bottom-left-radius: 0 !important; }
  `]
})
export class ChatbotComponent {
  isOpen = false;
  userInput = '';
  isTyping = false;
  messages: Message[] = [
    { text: 'Hi! How can I help you find the perfect car today?', sender: 'bot' }
  ];

  constructor(private chatbotService: ChatbotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    this.messages.push({ text: userMsg, sender: 'user' });
    this.userInput = '';
    this.isTyping = true;

    this.chatbotService.sendMessage(userMsg).subscribe({
      next: (res: any) => {
        this.messages.push({ text: res.response, sender: 'bot' });
        this.isTyping = false;
        this.scrollToBottom();
      },
      error: () => {
        this.messages.push({ text: 'Sorry, I am having trouble connecting right now.', sender: 'bot' });
        this.isTyping = false;
      }
    });
  }

  private scrollToBottom() {
      // In a real app we'd use ViewChild, but this is a simplified student project
      setTimeout(() => {
          const body = document.querySelector('.chat-body');
          if (body) body.scrollTop = body.scrollHeight;
      }, 100);
  }
}
