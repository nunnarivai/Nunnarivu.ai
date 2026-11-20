import React, { useState, useEffect } from 'react';
import {
  Users,
  PieChart,
  Blocks,
  SlidersHorizontal,
  Pause,
  Play,
  Search,
  Folder,
  Heart,
  Image as ImageIcon,
  Video,
  Wand2,
  UserCheck,
  Mic,
  Maximize2,
  Sliders,
  Plus,
  Send,
  RefreshCw,
  Copy,
  Check,
  ChevronLeft,
} from 'lucide-react';
import { WORKFLOW_TABS, USAGE_CHART_DAYS } from '../data/enterpriseData';
import { BrandLogo } from '../components/BrandLogo';
import { AlpineBackdrop, WorkspacePortraitThumb } from '../components/MediaArt';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './WorkflowSection.module.css';

interface WorkflowSectionProps {
  onDemoNotice: (msg: string) => void;
}

const STUDIO_TOP_LINKS = [
  'Explore',
  'Image',
  'Video',
  'Audio',
  'Edit',
  'Cinema Studio',
  'Supercomputer',
  'MCP',
  'Plugins',
  'Academy',
  'Ads Studio',
  'Marketing Studio',
  'Canvas',
  'Apps',
];

const STACK_AGENTS = [
  'Claude',
  'ChatGPT',
  'Cursor',
  'Claude Code',
  'Codex',
  'OpenClaw',
  'Hermes',
];

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onDemoNotice }) => {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<(typeof WORKFLOW_TABS)[number]['id']>('team');
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState('All Assets');
  const [commentInput, setCommentInput] = useState('@samuel try the red jacket.');
  const [usageScope, setUsageScope] = useState<'team' | 'personal'>('team');
  const [selectedDayIdx, setSelectedDayIdx] = useState(4); // Oct 23 featured day
  const [selectedAgent, setSelectedAgent] = useState('Claude');
  const [stackMode, setStackMode] = useState<'MCP' | 'CLI'>('MCP');
  const [copiedCli, setCopiedCli] = useState(false);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveTab((prev) => {
        const idx = WORKFLOW_TABS.findIndex((t) => t.id === prev);
        return WORKFLOW_TABS[(idx + 1) % WORKFLOW_TABS.length].id;
      });
    }, 11000);
    return () => window.clearInterval(timer);
  }, [isPaused, reducedMotion]);

  const renderTabIcon = (icon: string) => {
    switch (icon) {
      case 'users':
        return <Users size={13} />;
      case 'pie':
        return <PieChart size={13} />;
      case 'plug':
        return <Blocks size={13} />;
      default:
        return <SlidersHorizontal size={13} />;
    }
  };

  const renderSidebar = () => (
    <aside className={styles.sidebar} aria-label="Workspace Sidebar">
      <div className={styles.searchBox}>
        <Search size={12} className={styles.searchIcon} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          aria-label="Search workspace assets"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.navSection}>
        {[
          { label: 'Assets', count: 472, icon: <Folder size={12} /> },
          { label: 'Favorites', count: 32, icon: <Heart size={12} /> },
          { label: 'Members', count: 14, icon: <Users size={12} /> },
          { label: 'Workspaces', count: 4, icon: <Blocks size={12} /> },
        ].map((row) => (
          <button
            key={row.label}
            type="button"
            className={`${styles.sideRow} ${
              activeFolder === row.label || (activeFolder === 'All Assets' && row.label === 'Assets')
                ? styles.sideRowActive
                : ''
            }`}
            onClick={() => setActiveFolder(row.label)}
          >
            <span className={styles.sideRowLeft}>
              {row.icon}
              <span>{row.label}</span>
            </span>
            <span className={styles.sideCount}>{row.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.navSection}>
        <span className={styles.sideHeading}>Tools</span>
        {[
          { label: 'Image', count: 268, icon: <ImageIcon size={11} /> },
          { label: 'Video', count: 124, icon: <Video size={11} /> },
          { label: 'Edited', count: 36, icon: <Wand2 size={11} /> },
          { label: 'Characters', count: 18, icon: <UserCheck size={11} /> },
          { label: 'Lip sync', count: 12, icon: <Mic size={11} /> },
          { label: 'Upscale', count: 14, icon: <Maximize2 size={11} /> },
        ].map((tool) => (
          <button
            key={tool.label}
            type="button"
            className={`${styles.sideRow} ${activeFolder === tool.label ? styles.sideRowActive : ''}`}
            onClick={() => setActiveFolder(tool.label)}
          >
            <span className={styles.sideRowLeft}>
              {tool.icon}
              <span>{tool.label}</span>
            </span>
            <span className={styles.sideCount}>{tool.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.navSection}>
        <div className={styles.sideHeadingRow}>
          <span className={styles.sideHeading}>Shared folders</span>
          <Plus size={11} />
        </div>
        {[
          { emoji: '🎬', label: 'Fall campaign', count: 126 },
          { emoji: '📣', label: 'Social ads', count: 84 },
        ].map((f) => (
          <button
            key={f.label}
            type="button"
            className={`${styles.sideRow} ${activeFolder === f.label ? styles.sideRowActive : ''}`}
            onClick={() => setActiveFolder(f.label)}
          >
            <span className={styles.sideRowLeft}>
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </span>
            <span className={styles.sideCount}>{f.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.navSection}>
        <div className={styles.sideHeadingRow}>
          <span className={styles.sideHeading}>Private folders</span>
          <Plus size={11} />
        </div>
        {[
          { emoji: '📁', label: 'Drafts', count: 22 },
          { emoji: '🌑', label: 'References', count: 48 },
        ].map((f) => (
          <button
            key={f.label}
            type="button"
            className={`${styles.sideRow} ${activeFolder === f.label ? styles.sideRowActive : ''}`}
            onClick={() => setActiveFolder(f.label)}
          >
            <span className={styles.sideRowLeft}>
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </span>
            <span className={styles.sideCount}>{f.count}</span>
          </button>
        ))}
      </div>
    </aside>
  );

  const selectedDay = USAGE_CHART_DAYS[selectedDayIdx];

  return (
    <section id="workflow" className={styles.section}>
      <AlpineBackdrop />

      <div className={`hf-container ${styles.inner}`}>
        <h2 className={`hf-heading-lg hf-gradient-heading ${styles.heading}`}>
          PRO CONTROL OVER WORKFLOW
        </h2>

        {/* 4 Interactive Tabs + Pause Autoplay Button */}
        <div className={styles.tabControlsRow}>
          <div className={styles.tabList} role="tablist" aria-label="Enterprise Workflow Views">
            {WORKFLOW_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsPaused(true);
                  }}
                >
                  {renderTabIcon(tab.icon)}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={styles.pauseBtn}
            aria-label={isPaused ? 'Resume tabs' : 'Pause tabs'}
            onClick={() => setIsPaused((v) => !v)}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>

        {/* Enterprise Browser Workspace Preview */}
        <div className={styles.browserWindow} role="tabpanel">
          {/* macOS Browser Chrome */}
          <div className={styles.browserTitleBar}>
            <div className={styles.trafficLights}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>
            <div className={styles.browserTab}>
              <BrandLogo size={12} variant="lime-tile" />
              <span>Enterprise AI Creative Studio | Higgsfield</span>
            </div>
          </div>

          <div className={styles.browserUrlBar}>
            <span className={styles.urlArrows}>← → ↻</span>
            <div className={styles.urlField}>higgsfield.ai/enterprise-studio</div>
          </div>

          {/* Embedded Higgsfield Studio App Header */}
          <div className={styles.studioAppBar}>
            <div className={styles.studioAppLeft}>
              <BrandLogo size={20} variant="white-tile" />
              <div className={styles.studioAppLinks}>
                {STUDIO_TOP_LINKS.map((lbl, idx) => (
                  <span
                    key={lbl}
                    className={idx === 0 ? styles.studioLinkLime : styles.studioLink}
                  >
                    {lbl}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.studioAppRight}>
              <span className={styles.assetsChip}>Assets</span>
              <span className={styles.userAvatar}>S</span>
            </div>
          </div>

          {/* TAB 1: CREATE AS ONE TEAM */}
          {activeTab === 'team' && (
            <div className={styles.workspaceBody}>
              {renderSidebar()}

              <div className={styles.mainCanvas}>
                <div className={styles.canvasToolbar}>
                  <div className={styles.workspaceTitle}>
                    <ChevronLeft size={14} />
                    <span>
                      Studio workspace
                      {activeFolder !== 'All Assets' ? ` · ${activeFolder}` : ''}
                    </span>
                  </div>

                  <div className={styles.toolbarRight}>
                    <div className={styles.zoomTrack} aria-hidden="true">
                      <span className={styles.zoomThumb} />
                    </div>
                    <div className={styles.avatarStack}>
                      <span className={styles.avatarGreen}>S</span>
                      <span className={styles.avatarOrange}>A</span>
                      <span className={styles.avatarCount}>+12</span>
                    </div>
                    <button
                      type="button"
                      className={styles.filterBtn}
                      onClick={() =>
                        onDemoNotice('Workspace filter toggled (demo workspace preview).')
                      }
                    >
                      <Sliders size={11} />
                      <span>Filter</span>
                    </button>
                    <button
                      type="button"
                      className={styles.createBtn}
                      onClick={() =>
                        onDemoNotice('Demo mode: Studio asset creation requires an enterprise seat.')
                      }
                    >
                      Create
                    </button>
                  </div>
                </div>

                {/* Today Row */}
                <div className={styles.dayGroup}>
                  <div className={styles.dayHeader}>Today</div>
                  <div className={styles.assetGrid}>
                    {[0, 1, 2, 3, 4].map((slot) => (
                      <div key={slot} className={styles.generatingCard}>
                        <span className={styles.generatingBadge}>
                          <span className={styles.spinnerDot} />
                          Generating
                        </span>
                        {slot === 0 && (
                          <span className={styles.collaboratorCursor}>Sarah</span>
                        )}
                      </div>
                    ))}
                    <WorkspacePortraitThumb variant={0} badge="dot" />
                    {[1, 2, 3, 4, 5, 6].map((v) => (
                      <WorkspacePortraitThumb key={v} variant={v} badge={v === 1 ? 'S' : 'M'} />
                    ))}
                  </div>
                </div>

                {/* Yesterday Row + Samuel Live Comment Popover */}
                <div className={styles.dayGroup}>
                  <div className={styles.dayHeader}>Yesterday</div>
                  <div className={styles.yesterdayWrap}>
                    <div className={styles.assetGrid}>
                      {[7, 0, 2, 5, 6, 3].map((v, i) => (
                        <WorkspacePortraitThumb key={i} variant={v} badge="M" />
                      ))}
                    </div>

                    <div className={styles.commentPopover}>
                      <div className={styles.commentRow}>
                        <input
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          aria-label="Team review comment"
                          className={styles.commentField}
                        />
                      </div>
                      <div className={styles.commentFooter}>
                        <span className={styles.commentTools}>+ ☺</span>
                        <button
                          type="button"
                          className={styles.commentSendBtn}
                          aria-label="Send comment"
                          onClick={() =>
                            onDemoNotice(`Posted team note: "${commentInput}" (demo preview)`)
                          }
                        >
                          <Send size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FOR SMARTER SPEND */}
          {activeTab === 'spend' && (
            <div className={styles.workspaceBody}>
              <aside className={styles.sidebar}>
                <div className={styles.orgSwitcher}>Studio workspace ⌄</div>
                {['Personal profile', 'Organization', 'Members', 'Subscription', 'Usage'].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className={`${styles.sideRow} ${
                        item === 'Usage' ? styles.sideRowActive : ''
                      }`}
                      onClick={() =>
                        onDemoNotice(`Switched organization tab: ${item} (demo preview)`)
                      }
                    >
                      <span>{item}</span>
                    </button>
                  )
                )}
              </aside>

              <div className={styles.usageMain}>
                <div className={styles.usageHeaderRow}>
                  <div>
                    <h3 className={styles.usageTitle}>Usage history</h3>
                    <p className={styles.usageSub}>
                      Track credits and generation activity across your workspace
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.filterBtn}
                    onClick={() =>
                      onDemoNotice('Refreshed credit telemetry (demo snapshot: Oct 19–25, 2026).')
                    }
                  >
                    <RefreshCw size={11} />
                    <span>Refresh</span>
                  </button>
                </div>

                <div className={styles.usageSubTabs}>
                  <button
                    type="button"
                    className={
                      usageScope === 'team' ? styles.usageSubTabActive : styles.usageSubTab
                    }
                    onClick={() => setUsageScope('team')}
                  >
                    Team usage
                  </button>
                  <button
                    type="button"
                    className={
                      usageScope === 'personal' ? styles.usageSubTabActive : styles.usageSubTab
                    }
                    onClick={() => setUsageScope('personal')}
                  >
                    Personal usage
                  </button>
                </div>

                <div className={styles.usageFilters}>
                  {[
                    'All workspaces ⌄',
                    'Oct 19 – 25, 2026 ⌄',
                    'All projects ⌄',
                    'All models ⌄',
                    'All users ⌄',
                    'By credits ⌄',
                  ].map((pill) => (
                    <span key={pill} className={styles.usageFilterChip}>
                      {pill}
                    </span>
                  ))}
                </div>

                <div className={styles.usageKpiGrid}>
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiVal}>
                      {usageScope === 'team' ? '4,128' : '642'}
                    </span>
                    <span className={styles.kpiLbl}>Total generations</span>
                  </div>
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiVal}>
                      {usageScope === 'team' ? '279,800' : '41,200'}
                    </span>
                    <span className={styles.kpiLbl}>Credits spent</span>
                  </div>
                  <div className={styles.kpiCard}>
                    <span className={styles.kpiVal}>8</span>
                    <span className={styles.kpiLbl}>Models used</span>
                  </div>
                </div>

                {/* Interactive Stacked Bar Chart + Breakdown Card */}
                <div className={styles.chartAndPopover}>
                  <div className={styles.barsStage}>
                    {USAGE_CHART_DAYS.map((day, idx) => {
                      const isSelected = idx === selectedDayIdx;
                      const heightPct = Math.round((day.total / 60000) * 100);
                      return (
                        <button
                          key={day.day}
                          type="button"
                          className={styles.barColumn}
                          onClick={() => setSelectedDayIdx(idx)}
                          onMouseEnter={() => setSelectedDayIdx(idx)}
                        >
                          <div className={styles.barTrack}>
                            <div
                              className={`${styles.barStack} ${
                                isSelected ? styles.barStackActive : styles.barStackMuted
                              }`}
                              style={{ height: `${heightPct}%` }}
                            >
                              {day.segments.map((seg) => (
                                <div
                                  key={seg.model}
                                  style={{
                                    flex: seg.credits,
                                    background: isSelected ? seg.color : 'rgba(255,255,255,0.16)',
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <span className={styles.barLabel}>{day.day}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className={styles.breakdownCard}>
                    <div className={styles.breakdownTotal}>
                      {selectedDay.total.toLocaleString()}
                    </div>
                    <div className={styles.breakdownSub}>
                      Credits spent on {selectedDay.dateLabel || `${selectedDay.day}, 2026`}
                    </div>
                    <ul className={styles.breakdownList}>
                      {selectedDay.segments.map((seg) => (
                        <li key={seg.model} className={styles.breakdownItem}>
                          <span className={styles.breakdownModel}>
                            <span
                              className={styles.modelDot}
                              style={{ background: seg.color }}
                            />
                            {seg.model}
                          </span>
                          <span>{seg.credits.toLocaleString()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONNECT YOUR STACK */}
          {activeTab === 'stack' && (
            <div className={styles.workspaceBody}>
              {renderSidebar()}

              <div className={styles.stackMain}>
                <div className={styles.stackTopBar}>
                  <div className={styles.agentPills}>
                    {STACK_AGENTS.map((agent) => (
                      <button
                        key={agent}
                        type="button"
                        className={`${styles.agentPill} ${
                          selectedAgent === agent ? styles.agentPillActive : ''
                        }`}
                        onClick={() => setSelectedAgent(agent)}
                      >
                        {agent}
                      </button>
                    ))}
                  </div>
                  <div className={styles.modeSwitch}>
                    {(['MCP', 'CLI'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`${styles.modeBtn} ${
                          stackMode === m ? styles.modeBtnActive : ''
                        }`}
                        onClick={() => setStackMode(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.stackSplit}>
                  <div className={styles.stackLeftCol}>
                    <h4 className={styles.stackHeading}>
                      Connect Higgsfield to {selectedAgent} ({stackMode})
                    </h4>

                    <div className={styles.cliCard}>
                      <button
                        type="button"
                        className={styles.copyBtn}
                        aria-label="Copy setup snippet"
                        onClick={() => {
                          setCopiedCli(true);
                          window.setTimeout(() => setCopiedCli(false), 1800);
                        }}
                      >
                        {copiedCli ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                      <p>Set up Higgsfield so I can generate images and videos in this chat.</p>
                      <p>
                        1. Install the CLI:{' '}
                        <code className={styles.limeCode}>npm i -g @higgsfield/cli</code>.
                      </p>
                      <p>
                        2. Run <code className={styles.limeCode}>higgsfield auth login</code> and
                        sign in through the browser.
                      </p>
                      <p>
                        3. Add Higgsfield skills:{' '}
                        <code className={styles.limeCode}>
                          npx skills add higgsfield-ai/skills
                        </code>
                        .
                      </p>
                    </div>

                    <div className={styles.agentChatCard}>
                      <div className={styles.agentNameRow}>✴ {selectedAgent}</div>
                      <div className={styles.attachmentPair}>
                        <div className={styles.miniThumbCreator}>Creator</div>
                        <div className={styles.miniThumbTumbler}>Tumbler</div>
                      </div>
                      <p className={styles.chatPrompt}>
                        Create a 15-second vertical ad for this tumbler using the attached
                        creator. Show the product and keep the delivery natural.
                      </p>
                      <div className={styles.modelMetaRow}>
                        <span>Seedance 2.0</span>
                        <span>3:4</span>
                        <span>15s</span>
                        <span>Silent</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.stackPreviewCol}>
                    <div className={styles.verticalAdCard}>
                      <span className={styles.generatingBadge}>
                        <span className={styles.spinnerDot} />
                        Ready · 3:4 MP4
                      </span>
                      <div className={styles.tumblerPreviewArt}>
                        <div className={styles.tumblerCup} />
                        <span className={styles.adCaption}>15s Vertical Product Ad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRO CONTROL OVER WORKFLOW */}
          {activeTab === 'control' && (
            <div className={styles.workspaceBody}>
              {renderSidebar()}

              <div className={styles.mainCanvas}>
                <div className={styles.canvasToolbar}>
                  <div className={styles.workspaceTitle}>
                    <ChevronLeft size={14} />
                    <span>Studio workspace · Parallel Batch Queue</span>
                  </div>
                  <div className={styles.toolbarRight}>
                    <div className={styles.avatarStack}>
                      <span className={styles.avatarGreen}>S</span>
                      <span className={styles.avatarOrange}>A</span>
                      <span className={styles.avatarCount}>+12</span>
                    </div>
                    <span className={styles.createBtn}>18 Active GPU Nodes</span>
                  </div>
                </div>

                <div className={styles.dayGroup}>
                  <div className={styles.dayHeader}>Today</div>
                  <div className={styles.batchGridWrap}>
                    <div className={styles.assetGrid}>
                      {Array.from({ length: 18 }).map((_, idx) => (
                        <div key={idx} className={styles.generatingCard}>
                          <span className={styles.generatingBadge}>
                            <span className={styles.spinnerDot} />
                            Generating
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.samuelFloatingPill}>
                      <span className={styles.samuelDot} />
                      <span>Samuel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
