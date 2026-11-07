import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import useDialog from '../useDialog';
import { authClient } from '../lib/auth-client';

export default function AuthModal({ 
  isOpen, 
  initialMode = 'signin', 
  onClose,
  onAuthSuccess 
}) {
  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [googleStatus, setGoogleStatus] = useState({ checked: false, configured: false });

  useEffect(() => {
    setMode(initialMode);
    setErrorMsg('');
    setSuccessMsg('');
  }, [initialMode, isOpen]);

  // Fetch whether Google OAuth has been configured with real keys on the backend
  useEffect(() => {
    if (isOpen && !googleStatus.checked) {
      fetch('/api/auth-status')
        .then(res => res.json())
        .then(data => {
          setGoogleStatus({ checked: true, configured: Boolean(data.googleAuth) });
        })
        .catch(() => {
          setGoogleStatus({ checked: true, configured: false });
        });
    }
  }, [isOpen, googleStatus.checked]);

  const handleClose = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    onClose();
  };

  const dialogRef = useDialog(isOpen, handleClose);

  if (!isOpen) return null;

  // Handle Email & Password Sign Up (Without email verification)
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        callbackURL: window.location.href
      });

      if (error) {
        setErrorMsg(error.message || 'Unable to create account. Please check your details and try again.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Account created successfully! You are now signed in.');
      setLoading(false);
      setTimeout(() => {
        handleClose();
        if (onAuthSuccess) onAuthSuccess(data);
      }, 900);
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred during registration.');
      setLoading(false);
    }
  };

  // Handle Email & Password Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password: password,
        callbackURL: window.location.href
      });

      if (error) {
        setErrorMsg(error.message || 'Invalid email or password. Please verify your credentials.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Welcome back! Signed in successfully.');
      setLoading(false);
      setTimeout(() => {
        handleClose();
        if (onAuthSuccess) onAuthSuccess(data);
      }, 700);
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred during sign in.');
      setLoading(false);
    }
  };

  // Handle Google OAuth Sign In
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setSocialLoading(true);

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: window.location.href
      }, {
        onError: (ctx) => {
          setSocialLoading(false);
          if (!googleStatus.configured) {
            setErrorMsg(
              'Google OAuth is ready on the server, but GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET have not been configured yet in .env. You can sign in with Email & Password right now!'
            );
          } else {
            setErrorMsg(ctx.error.message || 'Google sign in failed. Please try again or use email.');
          }
        }
      });
    } catch (err) {
      setSocialLoading(false);
      if (!googleStatus.configured) {
        setErrorMsg(
          'Google OAuth requires GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env. You can sign up / sign in with Email & Password immediately without waiting!'
        );
      } else {
        setErrorMsg(err.message || 'Unable to connect to Google. Please try again.');
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div 
        ref={dialogRef}
        className="modal-container auth-modal-container animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className="modal-header auth-modal-header">
          <div className="modal-title-row">
            <div className="auth-brand-badge">
              <span>F</span>
            </div>
            <div>
              <h3 id="auth-modal-title" className="modal-title">
                {mode === 'signin' ? 'Sign In to FINOVARA' : 'Create Your FINOVARA Account'}
              </h3>
              <p className="modal-subtitle">
                {mode === 'signin' 
                  ? 'Access your advisory records, enquiries and engagement dashboard.' 
                  : 'Start your finance advisory journey with instant access.'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleClose}
            className="btn-close-modal"
            aria-label="Close dialog"
            data-dialog-autofocus
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tab-bar">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'signin' ? 'active' : ''}`}
            onClick={() => {
              setMode('signin');
              setErrorMsg('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
            }}
          >
            Create Account
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body auth-modal-body">

          {/* Social Sign In (Google) */}
          <div className="auth-social-block">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={socialLoading || loading}
              className="btn-google-social"
              title="Continue with Google"
            >
              {socialLoading ? (
                <div className="auth-spinner mini" />
              ) : (
                <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>
            {!googleStatus.configured && (
              <p className="auth-google-hint">
                💡 Google OAuth connects automatically once <code>GOOGLE_CLIENT_ID</code> is configured in <code>.env</code>.
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <span className="divider-line"></span>
            <span className="divider-label">or with email & password</span>
            <span className="divider-line"></span>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="auth-alert auth-alert-error animate-fade-in" role="alert">
              <AlertCircle size={18} className="alert-icon" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="auth-alert auth-alert-success animate-fade-in" role="alert">
              <CheckCircle size={18} className="alert-icon" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} className="auth-form">
            
            {mode === 'signup' && (
              <div className="form-group">
                <label className="form-label" htmlFor="auth-name">
                  Full Name <span className="req-star">*</span>
                </label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    id="auth-name"
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-input"
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="auth-email">
                Email Address <span className="req-star">*</span>
              </label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  id="auth-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="auth-password">
                Password <span className="req-star">*</span>
              </label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn-toggle-password"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div className="form-group">
                <label className="form-label" htmlFor="auth-confirm-password">
                  Confirm Password <span className="req-star">*</span>
                </label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input
                    id="auth-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn-toggle-password"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="auth-no-verify-note">
                <Sparkles size={14} className="note-icon" />
                <span>Instant Access: No email verification step required. Your account is active immediately upon creation.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || socialLoading}
              className="btn btn-lime btn-block auth-submit-btn"
            >
              {loading ? (
                <>
                  <div className="auth-spinner" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="btn-mark">■</span>
                  <span>{mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

          </form>

          {/* Footer toggle */}
          <div className="auth-modal-footer-switch">
            {mode === 'signin' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                  }}
                  className="auth-switch-link"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMsg('');
                  }}
                  className="auth-switch-link"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>

          <div className="auth-privacy-badge">
            <ShieldCheck size={14} />
            <span>DPDP Act &amp; Confidential Financial Advisory Standards Compliant</span>
          </div>

        </div>
      </div>
    </div>
  );
}
